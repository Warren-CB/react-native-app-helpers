import react from "eslint-plugin-react";
import jest from "eslint-plugin-jest";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("plugin:react/recommended"),
    {
        plugins: {
            react,
            jest,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...jest.environments.globals.globals,
            },

            ecmaVersion: "latest",
            sourceType: "module",

            parserOptions: {
                project: "tsconfig.json",
            },
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            "react/prop-types": "off",
        },
    },
];