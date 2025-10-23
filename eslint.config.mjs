import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import roblox from "eslint-plugin-roblox-ts"
import prettier from "eslint-plugin-prettier"

export default [
	{
		ignores: ["out"],
	},
	{
		files: ["**/*.{ts,tsx,js,jsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2018,
				sourceType: "module",
				project: "./tsconfig.json",
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			"roblox-ts": roblox,
			prettier: prettier,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...roblox.configs.recommended.rules,
			...prettier.configs.recommended.rules,
			"prettier/prettier": "warn",
			"prefer-const": "warn",
			"@typescript-eslint/no-unused-vars": ["warn", {
				"argsIgnorePattern": "^_",
				"varsIgnorePattern": "^_"
			}]
		},
	},
];
