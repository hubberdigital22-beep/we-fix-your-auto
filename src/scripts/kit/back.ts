const cameFromSite = (): boolean => {
	if (!document.referrer || window.history.length < 2) return false;
	try {
		return new URL(document.referrer).origin === window.location.origin;
	} catch {
		return false;
	}
};

document.querySelectorAll<HTMLAnchorElement>('[data-back]').forEach((link) => {
	link.addEventListener('click', (event) => {
		if (!cameFromSite()) return;
		event.preventDefault();
		window.history.back();
	});
});
