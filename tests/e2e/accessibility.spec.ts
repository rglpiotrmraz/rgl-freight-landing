import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Audit", () => {
  test("should have no accessibility violations on the homepage", async ({
    page,
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include("body")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
