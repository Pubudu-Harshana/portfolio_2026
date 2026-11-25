import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

test("portfolio data references existing local image and CV assets", () => {
  const dataSource = fs.readFileSync(
    path.join(root, "src", "data", "portfolio.ts"),
    "utf8"
  );

  const assetMatches = [
    ...dataSource.matchAll(/["'](\/(?:images|Pubudu_Harshana)[^"']+)["']/g),
  ];
  assert.ok(assetMatches.length > 0, "Expected local asset paths in portfolio.ts");

  for (const match of assetMatches) {
    const relPath = match[1].replace(/^\//, "");
    const fullPath = path.join(root, "public", relPath);
    assert.ok(fs.existsSync(fullPath), `Missing public asset: ${fullPath}`);
  }
});

test("contact API route contains validation, honeypot, and rate limiting", () => {
  const routeSource = fs.readFileSync(
    path.join(root, "src", "app", "api", "contact", "route.ts"),
    "utf8"
  );

  assert.match(routeSource, /checkRateLimit/);
  assert.match(routeSource, /status:\s*429/);
  assert.match(routeSource, /honeypot/);
  assert.match(routeSource, /escapeHtml/);
});
