import test from "node:test";
import assert from "node:assert";

function sanitizeTitle(input?: string): string {
  if (!input) return "CineFlow AI Studio";
  const cleaned = input.replace(/[^\p{L}\p{N}\s\-_.]/gu, "").trim();
  return cleaned.substring(0, 60) || "CineFlow AI Studio";
}

test("Security Sanitizer - Strips dangerous shell metacharacters", () => {
  const maliciousInput = "My Movie; rm -rf / && echo pwned | calc";
  const sanitized = sanitizeTitle(maliciousInput);

  assert.strictEqual(sanitized.includes(";"), false);
  assert.strictEqual(sanitized.includes("&"), false);
  assert.strictEqual(sanitized.includes("|"), false);
  assert.strictEqual(sanitized.includes("/"), false);
  assert.strictEqual(sanitized.includes("`"), false);
  assert.strictEqual(sanitized.includes("$"), false);
});

test("Security Sanitizer - Preserves clean Arabic text and punctuation", () => {
  const arabicTitle = "سر واحة النجوم - مغامرة عمر ورقية";
  const sanitized = sanitizeTitle(arabicTitle);

  assert.strictEqual(sanitized, "سر واحة النجوم - مغامرة عمر ورقية");
});

test("Security Sanitizer - Handles empty and undefined input with safe fallback", () => {
  assert.strictEqual(sanitizeTitle(undefined), "CineFlow AI Studio");
  assert.strictEqual(sanitizeTitle(""), "CineFlow AI Studio");
  assert.strictEqual(sanitizeTitle("   ;;;   "), "CineFlow AI Studio");
});
