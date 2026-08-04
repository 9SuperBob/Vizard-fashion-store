import assert from "node:assert/strict";
import test from "node:test";
import { build } from "vite";

const pageImports = [
  "HomePage",
  "CollectionPage",
  "ProductDetailPage",
  "MensPage",
  "WomensPage",
  "JournalPage",
  "JournalDetailPage",
  "LookbookPage",
  "SizeGuidePage",
  "AppointmentsPage",
  "AboutPage",
]
  .map((page) => `import "/src/pages/${page}.jsx";`)
  .join("\n");

test("all storefront page modules compile through Vite", async () => {
  const output = await build({
    configFile: false,
    logLevel: "silent",
    plugins: [
      {
        name: "page-import-contract",
        resolveId(id) {
          return id === "virtual:pages" ? `\0${id}` : null;
        },
        load(id) {
          return id === "\0virtual:pages" ? pageImports : null;
        },
      },
    ],
    build: {
      rollupOptions: { input: "virtual:pages" },
      write: false,
    },
  });

  assert.ok(output);
});
