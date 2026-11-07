import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

export async function checkFFmpegInstalled(): Promise<{ available: boolean; version?: string; error?: string }> {
  try {
    const { stdout } = await execAsync("ffmpeg -version");
    const firstLine = stdout.split("\n")[0];
    return { available: true, version: firstLine };
  } catch (err: any) {
    return { available: false, error: err?.message || "FFmpeg not detected in PATH" };
  }
}

export interface RenderOptions {
  aspectRatio: "16:9" | "9:16" | "1:1";
  resolution: "720p" | "1080p";
  fps?: number;
  duration?: number;
  titleOverlay?: string;
  outputPath?: string;
}

/**
 * Strict sanitization to completely eliminate command injection risks
 */
function sanitizeTitle(input?: string): string {
  if (!input) return "CineFlow AI Studio";
  // Allow only alphanumeric, Arabic characters, common punctuation (space, period, dash, underscore)
  const cleaned = input.replace(/[^\p{L}\p{N}\s\-_.]/gu, "").trim();
  return cleaned.substring(0, 60) || "CineFlow AI Studio";
}

export async function generateCinematicTestClip(options: RenderOptions): Promise<{ success: boolean; filePath: string; log: string }> {
  const publicDir = path.join(process.cwd(), "public", "renders");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const timestamp = Date.now();
  const fileName = `cineflow_render_${timestamp}.mp4`;
  const filePath = path.join(publicDir, fileName);

  // Strict aspect ratio and resolution validation
  let resolutionFilter = "1920x1080";
  if (options.aspectRatio === "9:16") {
    resolutionFilter = options.resolution === "1080p" ? "1080x1920" : "720x1280";
  } else if (options.aspectRatio === "1:1") {
    resolutionFilter = options.resolution === "1080p" ? "1080x1080" : "720x720";
  } else {
    resolutionFilter = options.resolution === "1080p" ? "1920x1080" : "1280x720";
  }

  // Duration guard: clamped safely between 1 and 30 seconds
  const rawDuration = Number(options.duration);
  const duration = isNaN(rawDuration) ? 4 : Math.max(1, Math.min(30, Math.round(rawDuration)));

  const cleanTitle = sanitizeTitle(options.titleOverlay);

  // Ultra-stable cross-platform FFmpeg command using native lavfi generators
  const command = `ffmpeg -y -f lavfi -i "color=c=#0b0f17:s=${resolutionFilter}:d=${duration}" -f lavfi -i "sine=frequency=432:duration=${duration}" -vf "drawbox=x=0:y=0:w=iw:h=12:color=#8b5cf6@0.8:t=fill,drawbox=x=0:y=ih-12:w=iw:h=12:color=#06b6d4@0.8:t=fill" -c:v libx264 -pix_fmt yuv420p -c:a aac -shortest "${filePath}"`;

  try {
    const { stdout, stderr } = await execAsync(command);
    return {
      success: true,
      filePath: `/renders/${fileName}`,
      log: stderr || stdout
    };
  } catch (err: any) {
    return {
      success: false,
      filePath: "",
      log: err?.message || "Failed executing FFmpeg"
    };
  }
}
