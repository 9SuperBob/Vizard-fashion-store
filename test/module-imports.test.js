import test from "node:test";
import assert from "node:assert/strict";
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
