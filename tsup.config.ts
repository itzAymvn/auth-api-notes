import { defineConfig } from "tsup"

export default defineConfig({
	entry: ["src/index.ts"],
	outDir: "dist",
	format: ["cjs"],
	target: "es2016",
	minify: true,
	sourcemap: false,
	clean: true,
	dts: false,
})
