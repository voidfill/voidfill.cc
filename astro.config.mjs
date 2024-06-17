// @ts-check
import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import { browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
	integrations: [
		solidJs(),
		sitemap(),
		mdx({
			syntaxHighlight: "shiki",
		}),
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
