export const track = (event: Record<string, unknown>): void => {
	window.dataLayer = window.dataLayer ?? [];
	window.dataLayer.push(event);
};
