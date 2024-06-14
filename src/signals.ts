import { createEffect, createMemo, createRoot, createSignal } from 'solid-js';

export const [theme, setTheme] = createSignal<"light" | "dark" | "auto">(localStorage.getItem('theme') as any || 'auto');

const b = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
const [browserTheme, setBrowserTheme] = createSignal<"light" | "dark">(b.matches ? 'light' : 'dark');

b.addEventListener("change", e => setBrowserTheme(e.matches ? 'light' : 'dark'));

createRoot(() => {
	const actualTheme = createMemo<"light" | "dark">(() => {
		const t = theme();
		if (t === 'auto') return browserTheme();
		return t;
	});

	createEffect(() => {
		document.body.dataset.theme = actualTheme();
		localStorage.setItem('theme', theme());
	});

	document.addEventListener("astro:before-swap", (e) => {
		e.newDocument.body.dataset.theme = actualTheme();
	});
});

