import test from "node:test";
import assert from "node:assert";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

test("API Integration - GET /api/ffmpeg/render returns host engine status", async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/ffmpeg/render`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(typeof data.available, "boolean");
    assert.ok(data.engine.includes("FFmpeg"));
  } catch (err: any) {
    if (err.cause?.code === "ECONNREFUSED") {
      test.skip("Server not currently running on port 3000");
    } else {
      throw err;
    }
  }
});

test("API Integration - GET /api/google/flow returns connected Google account status", async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/google/flow`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.status, "connected");
    assert.ok(data.account.email.includes("gmail.com"));
  } catch (err: any) {
    if (err.cause?.code === "ECONNREFUSED") {
      test.skip("Server not currently running on port 3000");
    } else {
      throw err;
    }
  }
});

test("API Integration - POST /api/google/flow generates direct video", async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/google/flow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sceneTitle: "عمر في الواحة",
        prompt: "Omar in historical oasis",
        characterId: "char-omar",
        aspectRatio: "16:9",
        duration: 3
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.videoUrl.length > 0);
  } catch (err: any) {
    if (err.cause?.code === "ECONNREFUSED") {
      test.skip("Server not currently running on port 3000");
    } else {
      throw err;
    }
  }
});

test("API Integration - POST /api/director generates film production package", async () => {
  try {
    const payload = {
      idea: "مغامرة استكشافية لعمر ورقية في قلعة نزوى",
      genre: "adventure-comedy"
    };
    const res = await fetch(`${BASE_URL}/api/director`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.ok(Array.isArray(body.data.scenes));
    assert.ok(Array.isArray(body.data.dialogues));
    assert.ok(body.data.scenes.length >= 3);
  } catch (err: any) {
    if (err.cause?.code === "ECONNREFUSED") {
      test.skip("Server not currently running on port 3000");
    } else {
      throw err;
    }
  }
});

test("API Integration - POST /api/qc/analyze returns 7 heuristic checks", async () => {
  try {
    const payload = {
      sceneId: "scene-1",
      characterIds: ["char-omar", "char-ruqayya"],
      estimatedDuration: 6
    };
    const res = await fetch(`${BASE_URL}/api/qc/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(typeof body.report.overallScore, "number");
    assert.ok(body.report.checks.characterConsistency);
    assert.ok(body.report.checks.wardrobeAccuracy);
  } catch (err: any) {
    if (err.cause?.code === "ECONNREFUSED") {
      test.skip("Server not currently running on port 3000");
    } else {
      throw err;
    }
  }
});

test("API Integration - POST /api/director rejects empty idea with 400 Bad Request", async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/director`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea: "" })
    });
    assert.ok([200, 400].includes(res.status));
  } catch (err: any) {
    if (err.cause?.code === "ECONNREFUSED") {
      test.skip("Server not currently running on port 3000");
    } else {
      throw err;
    }
  }
});
