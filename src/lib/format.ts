export function formatRepositoryName(name: string) {
	return name
		.replace(/[-_]+/g, ' ')
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.split(' ')
		.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
		.join(' ');
}

export function createAnchorSlug(company: string) {
	return company
		.normalize('NFKD')
		.toLowerCase()
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function formatDate(value: string) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		year: 'numeric'
	}).format(new Date(value));
}
