export const whenIdle = (task: () => void): void => {
	if ('requestIdleCallback' in window) window.requestIdleCallback(task, { timeout: 1200 });
	else setTimeout(task, 250);
};
