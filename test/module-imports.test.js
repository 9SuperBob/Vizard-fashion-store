import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { build } from "vite";

test("imports route constants", async () => {
  const { routes } = await import("../src/utils/routes.js");

  assert.equal(routes.home, "#/");
});

test("the application entry module compiles through Vite", async () => {
  const output = await build({
    configFile: false,
    logLevel: "silent",
    build: {
      rollupOptions: { input: "src/App.jsx" },
      write: false,
    },
  });

  assert.ok(output);
});

test("the HTML entry loads the Vite React module directly", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(html, /src="\/src\/main\.jsx"/);
  assert.doesNotMatch(html, /bootstrap\.js/);
});
