export function emitStorageEvent(func: () => void) {
	func();
	window.dispatchEvent(new Event('storage'));
}
