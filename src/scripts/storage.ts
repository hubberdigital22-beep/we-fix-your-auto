export const storage = {
	read(key: string): string | null {
		try {
			return window.sessionStorage.getItem(key);
		} catch {
			return null;
		}
	},
	write(key: string, value: string): void {
		try {
			window.sessionStorage.setItem(key, value);
		} catch {
			return;
		}
	},
	remove(key: string): void {
		try {
			window.sessionStorage.removeItem(key);
		} catch {
			return;
		}
	},
};
