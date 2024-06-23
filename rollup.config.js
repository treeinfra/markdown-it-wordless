import replace from "@rollup/plugin-replace"
import terser from "@rollup/plugin-terser"
import typescript from "@rollup/plugin-typescript"
import {defineConfig} from "rollup"
import dts from "rollup-plugin-dts"

export default defineConfig([
  {
    plugins: [
      replace({"import.meta.vitest": "undefined", preventAssignment: true}),
      typescript({
        compilerOptions: {allowSyntheticDefaultImports: true},
        sourceMap: true,
      }),
      terser(),
    ],
    external: ["vitest"],
    input: "index.ts",
    output: [
      {file: "index.js", format: "esm", sourcemap: true},
      {file: "index.cjs", format: "cjs", sourcemap: true},
    ],
  },
  {
    plugins: [dts({compilerOptions: {allowSyntheticDefaultImports: true}})],
    input: "index.ts",
    output: {file: "index.d.ts", format: "esm"},
  },
])
