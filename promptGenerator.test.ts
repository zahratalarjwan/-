import test from "node:test";
import assert from "node:assert";
import { generateScenePrompt } from "../../src/lib/promptGenerator.ts";
import { INITIAL_CHARACTERS, CAMERA_MOVEMENTS, INITIAL_SCENES } from "../../src/lib/initialData.ts";

test("Prompt Generator - Simple Mode enforces Omar character lock", () => {
  const scene = INITIAL_SCENES[0];
  const cam = CAMERA_MOVEMENTS[0];
  const result = generateScenePrompt(scene, INITIAL_CHARACTERS, cam, "simple", "google-flow");

  assert.strictEqual(result.mode, "simple");
  assert.strictEqual(result.targetProvider, "google-flow");
  assert.ok(result.promptText.includes("[Flow Prompt]"));
  assert.ok(result.promptText.includes("Omar: cute Omani boy"));
  assert.ok(result.promptText.includes("white dishdasha"));
  assert.ok(result.promptText.includes("Omani kammah"));
  assert.ok(result.negativePrompt.includes("no western clothing"));
});

test("Prompt Generator - Simple Mode enforces Ruqayya character lock and hijab modesty", () => {
  const scene = INITIAL_SCENES[1];
  const cam = CAMERA_MOVEMENTS[1];
  const result = generateScenePrompt(scene, INITIAL_CHARACTERS, cam, "simple", "veo");

  assert.strictEqual(result.targetProvider, "veo");
  assert.ok(result.promptText.includes("Google Veo Cinematic"));
  assert.ok(result.promptText.includes("Ruqayya: smart Omani girl"));
  assert.ok(result.promptText.includes("emerald green hijab completely covering hair"));
  assert.ok(result.negativePrompt.includes("never reveal hair under hijab"));
  assert.ok(result.negativePrompt.includes("exposed hair on Ruqayya"));
});

test("Prompt Generator - Professional Mode includes cinematic lighting and depth", () => {
  const scene = INITIAL_SCENES[2];
  const cam = CAMERA_MOVEMENTS[2];
  const result = generateScenePrompt(scene, INITIAL_CHARACTERS, cam, "professional", "runway");

  assert.strictEqual(result.mode, "professional");
  assert.strictEqual(result.targetProvider, "runway");
  assert.ok(result.promptText.includes("Master Cinematic Scene"));
  assert.ok(result.promptText.includes("volumetric light rays"));
  assert.ok(result.promptText.includes("--gen-3-alpha"));
});

test("Prompt Generator - Advanced Mode outputs technical flags and token metrics", () => {
  const scene = INITIAL_SCENES[3];
  const cam = CAMERA_MOVEMENTS[3];
  const result = generateScenePrompt(scene, INITIAL_CHARACTERS, cam, "advanced", "higgsfield");

  assert.strictEqual(result.mode, "advanced");
  assert.ok(result.promptText.includes("PROMPT_START"));
  assert.ok(result.promptText.includes("--camera-motion"));
  assert.ok(result.promptText.includes("--quality=ultra"));
  assert.ok(result.estimatedTokens > 0);
});
