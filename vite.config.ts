import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";
import JavaScriptObfuscator from "javascript-obfuscator";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3099,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode !== "development" && {
      name: "obfuscate-fluid-chunk",
      closeBundle() {
        const assetsDir = path.resolve(__dirname, "dist/assets");
        const files = fs.readdirSync(assetsDir);
        const fluidChunk = files.find(f => /^fluid-[\w-]+\.js$/.test(f));
        if (!fluidChunk) {
          console.warn("  \u26a0  Fluid chunk not found \u2014 skipping obfuscation");
          return;
        }
        const filePath = path.join(assetsDir, fluidChunk);
        const code = fs.readFileSync(filePath, "utf-8");
        const obfuscated = JavaScriptObfuscator.obfuscate(code, {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          numbersToExpressions: true,
          simplify: false,
          shuffleStringArray: true,
          splitStrings: true,
          stringArrayThreshold: 0.75,
          stringArray: true,
          stringArrayEncoding: ["base64"],
        });
        fs.writeFileSync(filePath, obfuscated.getObfuscatedCode());
        console.log(`  \u2713 Obfuscated: ${fluidChunk}`);
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("FluidBackground")) {
            return "fluid";
          }
        },
      },
    },
  },
}));
