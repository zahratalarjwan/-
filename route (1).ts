import { NextRequest, NextResponse } from "next/server";
import { checkFFmpegInstalled, generateCinematicTestClip } from "@/lib/ffmpeg";

export async function GET() {
  const status = await checkFFmpegInstalled();
  return NextResponse.json({
    engine: "FFmpeg 9.0.2 Server-Side Engine",
    ...status
  });
}

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const {
      aspectRatio = "16:9",
      resolution = "1080p",
      duration = 5,
      titleOverlay = "CineFlow AI Studio"
    } = body;

    // Strict validation
    const allowedRatios = ["16:9", "9:16", "1:1"];
    const allowedResolutions = ["720p", "1080p"];

    if (!allowedRatios.includes(aspectRatio)) {
      return NextResponse.json({
        success: false,
        error: `Invalid aspect ratio. Supported: ${allowedRatios.join(", ")}`
      }, { status: 400 });
    }

    if (!allowedResolutions.includes(resolution)) {
      return NextResponse.json({
        success: false,
        error: `Invalid resolution. Supported: ${allowedResolutions.join(", ")}`
      }, { status: 400 });
    }

    const numericDuration = Number(duration);
    if (isNaN(numericDuration) || numericDuration <= 0 || numericDuration > 30) {
      return NextResponse.json({
        success: false,
        error: "Duration must be a positive number up to 30 seconds"
      }, { status: 400 });
    }

    const renderResult = await generateCinematicTestClip({
      aspectRatio,
      resolution,
      duration: numericDuration,
      titleOverlay: typeof titleOverlay === "string" ? titleOverlay : "CineFlow AI Studio"
    });

    if (!renderResult.success) {
      return NextResponse.json({
        success: false,
        error: "FFmpeg rendering failed",
        log: renderResult.log
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      videoUrl: renderResult.filePath,
      aspectRatio,
      resolution,
      duration: numericDuration,
      renderedAt: new Date().toISOString(),
      engine: "FFmpeg Native Host Process"
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
