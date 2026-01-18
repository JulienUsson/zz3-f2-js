#!/usr/bin/env node
// @ts-check

import { execSync } from "child_process";
import { readdirSync, rmSync, cpSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  rmSync("dist", { recursive: true, force: true });
  console.log("✓ dist folder removed");
} catch (error) {
  console.log("ℹ dist folder does not exist");
}

try {
  const command = `pnpm --filter practices build`;

  console.log(`   Command: ${command}`);
  execSync(command, {
    stdio: "inherit",
    cwd: __dirname,
  });
  cpSync(join(__dirname, "practices", "dist"), join(__dirname, "dist"), {
    recursive: true,
  });

  console.log(`✓ practices built successfully`);
} catch (error) {
  console.error(`❌ Error building practices:`, error);
  process.exit(1);
}

const slideshowFiles = readdirSync(join(__dirname, "slides"));
if (!slideshowFiles) {
  console.error("Error reading slides/src folder");
  process.exit(1);
}
const slideshows = slideshowFiles.filter((file) => !file.startsWith("slidev-"));

if (slideshows.length === 0) {
  console.log("No slideshows found in slides folder.");
  process.exit(0);
}

console.log(`📁 ${slideshows.length} slideshow(s) found`);
slideshows.forEach((slideshow) => {
  console.log(`\n🔨 Building ${slideshow}...`);

  try {
    const command = `pnpm --filter ${slideshow} build`;

    console.log(`   Command: ${command}`);
    execSync(command, {
      stdio: "inherit",
      cwd: __dirname,
    });
    cpSync(
      join(__dirname, "slides", slideshow, "dist"),
      join(__dirname, "dist", slideshow),
      { recursive: true }
    );

    console.log(`✓ ${slideshow} built successfully`);
  } catch (error) {
    console.error(`❌ Error building ${slideshow}:`, error);
    process.exit(1);
  }
});
