// @ts-check
import { defineFlatConfig } from "eslint-define-config";
// @ts-expect-error
import { FlatCompat } from "@eslint/eslintrc";
// @ts-expect-error
import path from "path";
// @ts-expect-error
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
});

// @ts-expect-error
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import solid from "eslint-plugin-solid";

export default defineFlatConfig([
	eslint.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	...compat.plugins("eslint-plugin-jsx-a11y"),
	...eslintPluginAstro.configs["flat/recommended"],
	...eslintPluginAstro.configs["flat/jsx-a11y-recommended"],
	{
		...solid.configs["flat/recommended"],
		ignores: ["**/*.astro"],
	},
	{
		rules: {
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
]);
