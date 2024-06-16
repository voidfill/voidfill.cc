import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import { browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";
import { shield } from "@kindspells/astro-shield";
import node from "@astrojs/node";
import { resolve } from "node:path";
import sitemap from "@astrojs/sitemap";

// eslint-disable-next-line no-undef
const rootDir = new URL(".", import.meta.url).pathname;
const modulePath = resolve(rootDir, "src", "generated", "sriHashes.mjs");

export default defineConfig({
	integrations: [
		import.meta.env.PROD &&
			shield({
				sri: {
					hashesModule: modulePath,
					enableMiddleware: true,
				},
				securityHeaders: {
					contentSecurityPolicy: {},
				},
			}),
		solidJs(),
		sitemap(),
	],
	site: "https://voidfill.cc",
	output: "hybrid",
	build: {
		inlineStylesheets: "always",
	},
	vite: {
		css: {
			transformer: "lightningcss",
			lightningcss: {
				targets: browserslistToTargets(browserslist(">= 0.25%")),
			},
		},
		build: {
			cssMinify: "lightningcss",
		},
	},
	adapter: node({
		mode: "standalone",
	}),
	server: {
		port: 4396,
	},
});
