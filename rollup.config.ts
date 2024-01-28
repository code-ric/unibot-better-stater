import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  external: ["unibot-api/UniCore"],
  output: {
    file: `./dist/BetterStater.js`,
    format: "es",
    name: `better-stater`,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    replace({
      delimiters: ["", ""],
      preventAssignment: true,
      values: {
        "import { UniCore } from 'unibot-api/UniCore';":
          "const { UniCore } = require('UniCore');",
      },
    }),
  ],
};
