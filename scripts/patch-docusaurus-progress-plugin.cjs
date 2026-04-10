const fs = require("fs");
const path = require("path");

const target = path.join(
  process.cwd(),
  "node_modules",
  "@docusaurus",
  "bundler",
  "lib",
  "currentBundler.js",
);

if (!fs.existsSync(target)) {
  process.exit(0);
}

const source = fs.readFileSync(target, "utf8");

if (source.includes("CompatibleWebpackProgressPlugin")) {
  process.exit(0);
}

const needle = "    return webpackbar_1.default;";
const replacement = `    class CompatibleWebpackProgressPlugin extends currentBundler.instance.ProgressPlugin {\n        constructor(_options) {\n            super({ profile: false });\n        }\n    }\n    return CompatibleWebpackProgressPlugin;`;

if (!source.includes(needle)) {
  console.warn(
    "[patch-docusaurus-progress-plugin] Trecho alvo nao encontrado; patch ignorado.",
  );
  process.exit(0);
}

const patched = source.replace(needle, replacement);
fs.writeFileSync(target, patched, "utf8");
console.log("[patch-docusaurus-progress-plugin] Patch aplicado com sucesso.");
