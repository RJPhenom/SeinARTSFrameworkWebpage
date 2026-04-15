/**
 * Copies branding/ → public/branding/ before dev and build.
 * Runs cross-platform (Windows, macOS, Linux).
 */
import { cpSync, mkdirSync, existsSync, rmSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const src = resolve(root, "branding");
const dest = resolve(root, "public", "branding");

if (!existsSync(src)) {
  console.warn("[setup] branding/ not found — skipping asset copy.");
  process.exit(0);
}

if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true });
}

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("[setup] Branding assets synced → public/branding/");
