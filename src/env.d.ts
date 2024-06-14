/// <reference types="astro/client" />

declare global {
	interface Window {
		setTheme: (v: "light" | "dark" | "auto") => void;
	}
}