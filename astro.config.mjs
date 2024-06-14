import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";

import node from "@astrojs/node";

export default defineConfig({
  integrations: [solidJs()],
  output: "server",
  build: {
	  inlineStylesheets:"always",
  },
  vite: {
	css: {
		transformer: "lightningcss",
	},
  },
  adapter: node({
    mode: "standalone"
  })
});