import test from "node:test";
import assert from "node:assert";

function formatSrtTime(seconds: number): string {
  const safeSeconds = Math.max(0, isNaN(seconds) ? 0 : seconds);
  const hrs = Math.floor(safeSeconds / 3600);
  const mins = Math.floor((safeSeconds % 3600) / 60);
  const secs = Math.floor(safeSeconds % 60);
  const ms = Math.floor((safeSeconds % 1) * 1000);
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

test("Subtitles Formatter - Correctly formats zero timecode", () => {
  const formatted = formatSrtTime(0);
  assert.strictEqual(formatted, "00:00:00,000");
});

test("Subtitles Formatter - Formats multi-minute and millisecond timecodes", () => {
  const formatted = formatSrtTime(125.456);
  assert.strictEqual(formatted, "00:02:05,456");
});

test("Subtitles Formatter - Builds compliant SRT block", () => {
  const dialogues = [
    { speakerName: "عمر", arabicText: "انظر يا فرفور إلى الأفق!", startTime: 0.5, duration: 3.0 },
    { speakerName: "رقية", arabicText: "الخريطة تشير إلى الواحة.", startTime: 4.0, duration: 2.5 }
  ];

  let srtContent = "";
  dialogues.forEach((d, index) => {
    const startStr = formatSrtTime(d.startTime);
    const endStr = formatSrtTime(d.startTime + d.duration);
    srtContent += `${index + 1}\n${startStr} --> ${endStr}\n${d.speakerName}: ${d.arabicText}\n\n`;
  });

  assert.ok(srtContent.includes("1\n00:00:00,500 --> 00:00:03,500\nعمر: انظر يا فرفور إلى الأفق!"));
  assert.ok(srtContent.includes("2\n00:00:04,000 --> 00:00:06,500\nرقية: الخريطة تشير إلى الواحة."));
});
