import { NextRequest, NextResponse } from "next/server";
import { DialogueLine } from "@/types";

function formatSrtTime(seconds: number): string {
  const safeSeconds = Math.max(0, isNaN(seconds) ? 0 : seconds);
  const hrs = Math.floor(safeSeconds / 3600);
  const mins = Math.floor((safeSeconds % 3600) / 60);
  const secs = Math.floor(safeSeconds % 60);
  const ms = Math.floor((safeSeconds % 1) * 1000);
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const dialogues: DialogueLine[] = Array.isArray(body.dialogues) ? body.dialogues : [];
    const format = body.format === "vtt" ? "vtt" : "srt";

    let srtContent = "";
    dialogues.forEach((d, index) => {
      const startTime = Number(d.startTime) || 0;
      const duration = Number(d.duration) || 2;
      const startTimeStr = formatSrtTime(startTime);
      const endTimeStr = formatSrtTime(startTime + duration);
      const speaker = d.speakerName || "متحدث";
      const text = d.arabicText || "";
      srtContent += `${index + 1}\n${startTimeStr} --> ${endTimeStr}\n${speaker}: ${text}\n\n`;
    });

    if (format === "vtt") {
      const vttContent = `WEBVTT - CineFlow AI Studio\n\n` + srtContent.replace(/,/g, ".");
      return new NextResponse(vttContent, {
        headers: {
          "Content-Type": "text/vtt; charset=utf-8",
          "Content-Disposition": 'attachment; filename="subtitles.vtt"'
        }
      });
    }

    return new NextResponse(srtContent, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": 'attachment; filename="subtitles.srt"'
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
