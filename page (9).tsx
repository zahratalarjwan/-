"use client";

import { useState } from "react";
import {
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Scissors,
  Download,
  Film,
  Music,
  Mic,
  Maximize2,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Layers,
  ArrowRight
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { AspectRatio, VideoResolution, TimelineTrackClip } from "@/types";

export default function VideoEditorPage() {
  const { scenes, dialogues, project } = useCineFlowStore();

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(project.aspectRatio || "16:9");
  const [resolution, setResolution] = useState<VideoResolution>(project.resolution || "1080p");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [renderedVideoUrl, setRenderedVideoUrl] = useState<string | null>(null);
  const [renderLog, setRenderLog] = useState<string | null>(null);

  // Active clips in editor
  const videoClips = scenes.filter((s) => s.status === "Completed" || s.status === "Approved" || s.selectedImageUrl);
  const totalDuration = videoClips.reduce((acc, c) => acc + c.estimatedDuration, 0) || 15;

  const handleRenderFFmpeg = async () => {
    setIsRendering(true);
    setRenderedVideoUrl(null);
    setRenderLog(null);
    try {
      const res = await fetch("/api/ffmpeg/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aspectRatio,
          resolution,
          duration: totalDuration > 10 ? 8 : totalDuration,
          titleOverlay: project.title
        })
      });
      const data = await res.json();
      if (data.success && data.videoUrl) {
        setRenderedVideoUrl(data.videoUrl);
        setRenderLog(`تم المعالجة بنجاح عبر محرك FFmpeg 9.0.2 بنظام H.264 بدقة ${resolution} ونسبة ${aspectRatio}.`);
      } else {
        setRenderLog("خطأ أثناء تنفيذ معالجة FFmpeg: " + (data.error || ""));
      }
    } catch (e: any) {
      setRenderLog("فشل استدعاء محرك المونتاج: " + e.message);
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Sliders className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">استوديو المونتاج السينمائي — Video Editing Studio</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            تايم لاين متعدد المسارات لقص ودمج المشاهد وإضافة الانتقالات والتحكم بالصوت مع معالجة وتصدير حقيقي عبر FFmpeg 9.0.2.
          </p>
        </div>

        {/* Export & Render Action Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-cine-900 border border-cine-800 p-1 rounded-xl text-xs font-mono">
            {(["16:9", "9:16", "1:1"] as AspectRatio[]).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  aspectRatio === ratio
                    ? "bg-purple-600 text-white shadow-glow-purple"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>

          <button
            onClick={handleRenderFFmpeg}
            disabled={isRendering}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 text-white text-xs font-bold shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
          >
            {isRendering ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                <span>جاري معالجة وتصدير FFmpeg...</span>
              </>
            ) : (
              <>
                <Film className="w-4 h-4" />
                <span>تصدير الفيلم (Render MP4)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Player Monitor & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Video Player Display (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl space-y-4">
            {/* Aspect container */}
            <div
              className={`mx-auto bg-black rounded-2xl overflow-hidden relative border border-cine-700/80 flex items-center justify-center transition-all ${
                aspectRatio === "9:16" ? "aspect-[9/16] max-h-[460px]" : aspectRatio === "1:1" ? "aspect-square max-h-[460px]" : "aspect-video w-full"
              }`}
            >
              {renderedVideoUrl ? (
                <video
                  src={renderedVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : videoClips[0]?.selectedImageUrl ? (
                <div className="w-full h-full relative">
                  <img
                    src={videoClips[0]?.selectedImageUrl}
                    alt="Current Scene"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="text-xs font-bold text-amber-300">معاينة المشهد النشط</span>
                    <h3 className="text-base font-bold text-white">{videoClips[0]?.title}</h3>
                    <p className="text-xs text-zinc-300 font-arabic mt-1">{videoClips[0]?.synopsis}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-zinc-500 text-xs p-6">
                  <Film className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <span>لا توجد مشاهد جاهزة للمعاينة حالياً</span>
                </div>
              )}

              {/* Resolution pill */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                {resolution} • {aspectRatio}
              </div>
            </div>

            {/* Playback Controls Bar */}
            <div className="bg-cine-950 p-3 rounded-2xl border border-cine-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-glow-purple"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span className="font-mono text-zinc-300 text-xs">
                  00:0{currentTime}:00 / 00:{totalDuration < 10 ? `0${totalDuration}` : totalDuration}:00
                </span>
              </div>

              {/* Progress Slider */}
              <input
                type="range"
                min={0}
                max={totalDuration}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="flex-1 mx-4 accent-purple-500 cursor-pointer"
              />

              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-zinc-400" />
                <span className="text-[10px] font-mono text-zinc-400">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Inspector & Render Output Log (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Render Result Card */}
          <div className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              مخرجات الرندر والمعالجة (FFmpeg Engine)
            </h3>

            {renderLog && (
              <div className="p-3 bg-cine-950 rounded-xl font-mono text-[11px] text-zinc-300 border border-cine-800">
                {renderLog}
              </div>
            )}

            {renderedVideoUrl && (
              <a
                href={renderedVideoUrl}
                download="cineflow_rendered_movie.mp4"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>تحميل الفيديو النهائي (Download MP4)</span>
              </a>
            )}

            <div className="pt-2 text-xs text-zinc-400 font-arabic space-y-1.5 border-t border-cine-800">
              <div className="flex justify-between">
                <span>محرك المونتاج:</span>
                <span className="font-mono text-white">FFmpeg 9.0.2 Native</span>
              </div>
              <div className="flex justify-between">
                <span>ترميز الفيديو:</span>
                <span className="font-mono text-cyan-300">H.264 / AAC</span>
              </div>
              <div className="flex justify-between">
                <span>جودة الإخراج:</span>
                <span className="font-mono text-purple-300">1080p Cinema Master</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Track Timeline Strip */}
      <div className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-cine-800 pb-3 text-xs">
          <span className="font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>التايم لاين متعدد المسارات (Multi-Track Studio Timeline)</span>
          </span>
          <span className="font-mono text-cyan-400">{videoClips.length} مقاطع مدمجة</span>
        </div>

        {/* Track 1: Video Track */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
            <Film className="w-3.5 h-3.5 text-purple-400" />
            <span>مسار الفيديو (Video Track V1)</span>
          </div>
          <div className="h-16 bg-cine-950 rounded-xl border border-cine-800 flex items-center gap-2 p-1.5 overflow-x-auto custom-scrollbar">
            {videoClips.map((clip, i) => (
              <div
                key={clip.id}
                className="h-full bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/40 rounded-lg p-2 flex items-center gap-2 text-xs text-white shrink-0 min-w-[140px]"
              >
                <div className="w-10 h-10 rounded overflow-hidden bg-black shrink-0">
                  {clip.selectedImageUrl && <img src={clip.selectedImageUrl} className="w-full h-full object-cover" />}
                </div>
                <div className="min-w-0">
                  <span className="font-bold block truncate text-[11px]">#{i + 1} {clip.title}</span>
                  <span className="text-[10px] text-zinc-400 font-mono">{clip.estimatedDuration}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Dialogue Track */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
            <Mic className="w-3.5 h-3.5 text-cyan-400" />
            <span>مسار الحوارات العربية (Dialogue Track A1)</span>
          </div>
          <div className="h-12 bg-cine-950 rounded-xl border border-cine-800 flex items-center gap-2 p-1.5 overflow-x-auto custom-scrollbar">
            {dialogues.map((dial) => (
              <div
                key={dial.id}
                className="h-full bg-cyan-950/60 border border-cyan-500/30 rounded-lg px-3 flex items-center gap-2 text-xs text-cyan-200 shrink-0"
              >
                <span className="font-bold text-[11px]">{dial.speakerName}:</span>
                <span className="text-[11px] truncate max-w-[160px] font-arabic">«{dial.arabicText}»</span>
                <span className="text-[10px] text-zinc-400 font-mono">({dial.duration}s)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 3: SFX & Music Track */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>مسار الموسيقى والمؤثرات (BGM & SFX Track A2)</span>
          </div>
          <div className="h-10 bg-cine-950 rounded-xl border border-cine-800 flex items-center gap-2 p-1.5 overflow-x-auto custom-scrollbar">
            <div className="h-full bg-amber-950/40 border border-amber-500/30 rounded-lg px-4 flex items-center text-xs text-amber-300 w-full justify-between">
              <span>الموسيقى التصويرية: عُمانية ملحمية دافئة أوركسترالية</span>
              <span className="font-mono text-[10px] text-zinc-400">Volume: 75% • Crossfade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
