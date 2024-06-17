// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare global {
	interface Window {
		setTheme: (v: "light" | "dark" | "auto") => void;
		getTheme: () => "light" | "dark" | "auto";
	}
}

export type _dummyTypeDoNotUse = any;