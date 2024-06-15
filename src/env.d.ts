/// <reference types="astro/client" />

declare global {
	interface Window {
		setTheme: (v: "light" | "dark" | "auto") => void;
		getTheme: () => "light" | "dark" | "auto";
	}
}

export type _dummyTypeDoNotUse = any;