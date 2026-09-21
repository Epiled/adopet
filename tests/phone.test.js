import { beforeEach, describe, expect, it, vi } from "vitest";

describe("phone mask", () => {
  let field;

  beforeEach(async () => {
    vi.resetModules();

    document.body.innerHTML = `
    <input data-field="phone" />
  `;

    field = document.querySelector("[data-field='phone']");

    await import("../src/js/phone.js");
  });

  it("should format a phone number with 10 digits", () => {
    field.value = "1198765432";

    field.dispatchEvent(new Event("input"));

    expect(field.value).toBe("+55 (11) 9876-5432");
  });

  it("should format a phone number with 11 digits", () => {
    field.value = "11998765432";

    field.dispatchEvent(new Event("input"));

    expect(field.value).toBe("+55 (11) 9 9876-5432");
  });

  it("should remove non-numeric characters", () => {
    field.value = "(11) test 99876-5432";

    field.dispatchEvent(new Event("input"));

    expect(field.value).toBe("+55 (11) 9 9876-5432");
  });

  it("should remove country code and limit the phone to 11 digits", () => {
    field.value = "55119987654329999";

    field.dispatchEvent(new Event("input"));

    expect(field.value).toBe("+55 (11) 9 9876-5432");
  });
});
