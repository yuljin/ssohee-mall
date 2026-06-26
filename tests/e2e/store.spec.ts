import { expect, test } from "@playwright/test";

test("customer can create a demo order", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "포레스트 모닝 룩" })).toBeVisible();

  await page.getByRole("button", { name: /100.*92-100cm/ }).click();
  await page
    .locator(".primary-purchase:visible, .mobile-purchase-bar button:visible")
    .click();

  await page.getByLabel("주문자 이름").fill("김한별");
  await page.getByLabel("휴대폰 번호").fill("01012345678");
  await page.getByLabel("우편번호").fill("06236");
  await page.getByLabel("주소", { exact: true }).fill("서울시 강남구 테헤란로 1");
  await page.getByLabel(/필수.*주문/).check();
  await page.getByRole("button", { name: /데모 결제 완료/ }).click();

  await expect(page.getByRole("heading", { name: "주문이 접수되었습니다." })).toBeVisible();
  await expect(page.getByText("결제 완료")).toBeVisible();
});

test("archive exposes restock notification", async ({ page }) => {
  await page.goto("/archive");
  await page.getByRole("button", { name: "앙코르 알림" }).first().click();
  await page.getByPlaceholder("01012345678").fill("01012345678");
  await page.getByRole("button", { name: "신청하기" }).click();
  await expect(page.getByText("신청되었습니다.")).toBeVisible();
});

test("customer can inspect outfit item tags", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "가디건 평면 상세 보기" }).click();

  const dialog = page.getByRole("dialog", { name: "크림 골지 가디건" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("세트 포함")).toBeVisible();
  await expect(dialog.getByText("도톰한 골지 조직")).toBeVisible();

  await dialog.getByRole("button", { name: "아이템 상세 닫기" }).click();
  await expect(dialog).toBeHidden();
});
