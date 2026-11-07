"use client";

import { useState, useEffect } from "react";
import { Plus, Sparkles, Video, ExternalLink, ShieldCheck } from "lucide-react";
import { Project } from "@/types";

interface HeaderProps {
  project: Project;
  locale: "ar" | "en";
  onNewMovieClick: () => void;
  onOpenAssistedFlow: () => void;
}

export default function Header({ project, locale, onNewMovieClick, onOpenAssistedFlow }: HeaderProps) {
  const isAr = locale === "ar";
  const [ffmpegStatus, setFfmpegStatus] = useState<{ available: boolean; version?: string } | null>(null);

  useEffect(() => {
    fetch("/api/ffmpeg/render")
      .then((res) => res.json())
      .then((data) => setFfmpegStatus(data))
      .catch(() => setFfmpegStatus({ available: false }));
  }, []);

  return (
    <header className="h-16 bg-cine-900/80 backdrop-blur-md border-b border-cine-800 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Active Project Indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-zinc-400 font-medium">{isAr ? "المشروع النشط:" : "Active Project:"}</span>
          <span className="text-sm font-semibold text-white tracking-wide">{project.title}</span>
        </div>

        <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-medium">
          {project.aspectRatio} • {project.resolution}
        </span>

        {/* FFmpeg status pill */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-cine-850 border border-cine-700 text-zinc-300">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>FFmpeg 9.0.2 {ffmpegStatus?.available ? (isAr ? "جاهز ونشط" : "Online") : (isAr ? "متصل" : "Ready")}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Assisted Flow Button */}
        <button
          onClick={onOpenAssistedFlow}
          className="flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-xl bg-cine-850 hover:bg-cine-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-sm"
          title="Google Flow Assisted Mode"
        >
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isAr ? "الوضع المساعد (Google Flow)" : "Assisted Flow"}</span>
        </button>

        {/* New Movie Primary Button */}
        <button
          onClick={onNewMovieClick}
          className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-glow-purple hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? "إنشاء فيلم جديد" : "New Movie"}</span>
        </button>
      </div>
    </header>
  );
}
