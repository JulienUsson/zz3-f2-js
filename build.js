#!/usr/bin/env node
// @ts-check

import { execSync } from "child_process";
import { readdirSync, rmSync, cpSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🚧 Building packages...");
execSync("turbo build", {
  stdio: "inherit",
  cwd: __dirname,
});
console.log("✅ Packages built successfully");

try {
  rmSync("dist", { recursive: true, force: true });
  console.log("🧹 Cleaned up old dist folder");
} catch (error) {
  console.log("ℹ dist folder does not exist");
}

console.log("📦 Copying built packages to dist folder...");
cpSync(join(__dirname, "practices", "dist"), join(__dirname, "dist"), {
  recursive: true,
});

const slideshows = readdirSync(join(__dirname, "slides")).filter(
  (file) => !file.startsWith("slidev-")
);

console.log(`📁 ${slideshows.length} slideshow(s) found`);
slideshows.forEach((slideshow) => {
  console.log(`📦 Copying slideshow: ${slideshow}`);
  cpSync(
    join(__dirname, "slides", slideshow, "dist"),
    join(__dirname, "dist", slideshow),
    { recursive: true }
  );
});

console.log("✅ All built packages copied to dist folder successfully");
