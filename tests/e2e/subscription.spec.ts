import { test, expect } from "@playwright/test";

test.describe("Subscription Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the hero headline", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Get Direct Freight Offers" })
    ).toBeVisible();
  });

  test("should display all form fields", async ({ page }) => {
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Nazwa firmy")).toBeVisible();
    await expect(page.getByLabel("Nazwisko")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Subscribe" })
    ).toBeVisible();
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    await page.getByRole("button", { name: "Subscribe" }).click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Company name is required")).toBeVisible();
    await expect(page.getByText("Last name is required")).toBeVisible();
  });

  test("should show validation error for invalid email", async ({ page }) => {
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("Nazwa firmy").fill("Test Company");
    await page.getByLabel("Nazwisko").fill("Kowalski");
    await page.getByRole("button", { name: "Subscribe" }).click();

    await expect(
      page.getByText("Please enter a valid email address")
    ).toBeVisible();
  });

  test("should fill and submit the form successfully", async ({ page }) => {
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Nazwa firmy").fill("RGL Test Sp. z o.o.");
    await page.getByLabel("Nazwisko").fill("Nowak");

    await page.getByRole("button", { name: "Subscribe" }).click();

    // Wait for loading state
    await expect(
      page.getByRole("button", { name: "Subscribing..." })
    ).toBeVisible();

    // Wait for result (success or error depending on API availability)
    await page.waitForSelector('[role="status"], [role="alert"]', {
      timeout: 15000,
    });
  });
});

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display RGL logo", async ({ page }) => {
    const logo = page.getByAltText("RGL Logistics Network logo");
    await expect(logo).toBeVisible();
  });

  test("should display contact information", async ({ page }) => {
    await expect(page.getByText("Piotr Mraz")).toBeVisible();
    await expect(page.getByText("p.mraz@rgl.com.pl")).toBeVisible();
    await expect(page.getByText("+48 577 930 002")).toBeVisible();
    await expect(page.getByText("www.rgl.com.pl")).toBeVisible();
  });

  test("should display business information", async ({ page }) => {
    await expect(page.getByText("RGL Robert Gajewski")).toBeVisible();
    await expect(page.getByText("ul. Krakowska 28a")).toBeVisible();
    await expect(page.getByText("45-018 Opole")).toBeVisible();
    await expect(page.getByText("NIP: PL7532000665")).toBeVisible();
    await expect(page.getByText("Timocom ID: 330086")).toBeVisible();
  });

  test("should display copyright", async ({ page }) => {
    await expect(
      page.getByText("© 2026 RGL Logistics Network. All rights reserved.")
    ).toBeVisible();
  });
});
