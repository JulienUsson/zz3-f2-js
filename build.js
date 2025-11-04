#!/usr/bin/env node

import { execSync } from "child_process";
import { readdir, rmSync, mkdirSync } from "fs";
import { join, basename, extname } from "path";
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
  const command = `pnpm home:build --outDir ../dist`;

  console.log(`   Command: ${command}`);
  execSync(command, {
    stdio: "inherit",
    cwd: __dirname,
  });

  console.log(`✓ home built successfully`);
} catch (error) {
  console.error(`❌ Error building home:`, error.message);
  process.exit(1);
}

readdir(join(__dirname, "slides/src"), (err, files) => {
  if (err) {
    console.error("Error reading slides/src folder:", err);
    process.exit(1);
  }

  const mdFiles = files.filter((file) => extname(file) === ".md");

  if (mdFiles.length === 0) {
    console.log("No .md files found in slides/src/");
    process.exit(0);
  }

  console.log(`📁 ${mdFiles.length} .md file(s) found`);

  mdFiles.forEach((file) => {
    const slidesFilename = file;
    const slidesName = basename(file, ".md");

    console.log(`\n🔨 Building ${slidesName}...`);

    const distPath = join("dist", slidesName);
    mkdirSync(distPath, { recursive: true });

    try {
      const command = `pnpm slides:build src/${slidesFilename} --out ../../dist/${slidesName} --base /${slidesName}/`;

      console.log(`   Command: ${command}`);
      execSync(command, {
        stdio: "inherit",
        cwd: __dirname,
      });

      console.log(`✓ ${slidesName} built successfully`);
    } catch (error) {
      console.error(`❌ Error building ${slidesName}:`, error.message);
      process.exit(1);
    }
  });
});

console.log("\n🎉 Build completed successfully!");
