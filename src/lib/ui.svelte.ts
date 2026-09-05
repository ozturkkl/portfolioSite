export const ui = $state({
	showAllProjects: false,
	failedImageUrls: [] as string[]
});

export function recordFailedImage(url: string) {
	if (!ui.failedImageUrls.includes(url)) {
		ui.failedImageUrls.push(url);
	}
}
