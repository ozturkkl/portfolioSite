import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const owner = 'ozturkkl';
const outputPath = resolve('src/lib/data/projects.generated.json');
const featuredOrder = new Map([
  ['framework-control', 0],
  ['RadioWebApp', 1]
]);
const excludedRepositories = new Set([]);

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'kozturk-portfolio-build',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {})
};

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });

  if (!response.ok) {
    const remaining = response.headers.get('x-ratelimit-remaining');
    throw new Error(
      `GitHub ${response.status} for ${path}${remaining ? ` (${remaining} requests remaining)` : ''}`
    );
  }

  return response.json();
}

async function getRepositories() {
  const repositories = [];

  for (let page = 1; ; page += 1) {
    const batch = await github(
      `/users/${owner}/repos?per_page=100&page=${page}&sort=updated`
    );
    repositories.push(...batch);

    if (batch.length < 100) {
      return repositories;
    }
  }
}

function getImageCandidates(markdown) {
  const candidates = [];
  const markdownImages = markdown.matchAll(/!\[[^\]]*\]\(\s*<?([^\s)>]+)[^)]*\)/g);
  const htmlImages = markdown.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);

  for (const match of [...markdownImages, ...htmlImages]) {
    candidates.push(match[1]);
  }

  return candidates;
}

function resolveImage(candidate, repository, readme) {
  const value = candidate.replaceAll('&amp;', '&').trim();
  const badge = /badge|shields\.io|codecov|travis|circleci|github\.com\/.*\/actions/i;

  if (!value || value.startsWith('data:') || badge.test(value)) {
    return null;
  }

  if (value.startsWith('//')) {
    return `https:${value}`;
  }

  if (value.startsWith('/')) {
    return `https://raw.githubusercontent.com/${repository.full_name}/${repository.default_branch}${value}`;
  }

  try {
    const url = new URL(value, readme.download_url);

    if (url.hostname === 'github.com' && url.pathname.includes('/blob/')) {
      const [repoPath, branchPath] = url.pathname.split('/blob/');
      return `https://raw.githubusercontent.com${repoPath}/${branchPath}`;
    }

    return url.href;
  } catch {
    return null;
  }
}

async function getReadmeImage(repository) {
  try {
    const readme = await github(`/repos/${repository.full_name}/readme`);
    const markdown = Buffer.from(readme.content, 'base64').toString('utf8');

    for (const candidate of getImageCandidates(markdown)) {
      const image = resolveImage(candidate, repository, readme);
      if (image) {
        return image;
      }
    }
  } catch (error) {
    console.warn(`No usable README image for ${repository.name}: ${error.message}`);
  }

  return null;
}

async function buildSnapshot() {
  const repositories = (await getRepositories()).filter(
    (repository) =>
      !repository.archived &&
      !repository.fork &&
      !excludedRepositories.has(repository.name)
  );

  const projects = await Promise.all(
    repositories.map(async (repository) => ({
      id: repository.id,
      name: repository.name,
      url: repository.html_url,
      homepage: repository.homepage || null,
      description: repository.description || null,
      language: repository.language || null,
      topics: repository.topics ?? [],
      stars: repository.stargazers_count,
      forks: repository.forks_count,
      pushedAt: repository.pushed_at,
      image: await getReadmeImage(repository)
    }))
  );

  return projects.sort((a, b) => {
    const aFeatured = featuredOrder.get(a.name) ?? Number.MAX_SAFE_INTEGER;
    const bFeatured = featuredOrder.get(b.name) ?? Number.MAX_SAFE_INTEGER;

    return aFeatured - bFeatured || b.stars - a.stars ||
      Date.parse(b.pushedAt) - Date.parse(a.pushedAt);
  });
}

async function hasSnapshot() {
  try {
    const snapshot = JSON.parse(await readFile(outputPath, 'utf8'));
    return Array.isArray(snapshot) && snapshot.length > 0;
  } catch {
    return false;
  }
}

try {
  const projects = await buildSnapshot();
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(projects, null, 2)}\n`);
  console.log(`Wrote ${projects.length} active GitHub projects.`);
} catch (error) {
  if (await hasSnapshot()) {
    console.warn(`GitHub refresh failed; keeping the existing snapshot: ${error.message}`);
  } else {
    throw error;
  }
}
