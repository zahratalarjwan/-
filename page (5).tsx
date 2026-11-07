"use client";

import { useState } from "react";
import {
  Video,
  Camera,
  Compass,
  Sparkles,
  Zap,
  RotateCw,
  Eye,
  Sliders,
  CheckCircle2,
  Film,
  Target,
  ArrowRight,
  Minimize2
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { CameraMovement } from "@/types";

export default function CameraEnginePage() {
  const { cameraMovements } = useCineFlowStore();
  const [selectedMoveId, setSelectedMoveId] = useState<string>(cameraMovements[0]?.id || "cam-crash-zoom");
  const [selectedMood, setSelectedMood] = useState<string>("discovery");
  const [suggestedMove, setSuggestedMove] = useState<CameraMovement | null>(null);

  const selectedMove = cameraMovements.find((c) => c.id === selectedMoveId) || cameraMovements[0];

  const handleAutoSelect = (mood: string) => {
    setSelectedMood(mood);
    let matchedId = "cam-dolly-in";
    if (mood === "discovery") matchedId = "cam-crash-zoom";
    else if (mood === "epic") matchedId = "cam-orbit";
    else if (mood === "chase") matchedId = "cam-tracking";
    else if (mood === "mystery") matchedId = "cam-dutch-angle";
    else if (mood === "heroic") matchedId = "cam-low-angle";
    else if (mood === "intimate") matchedId = "cam-push-in";

    const match = cameraMovements.find((c) => c.id === matchedId) || cameraMovements[0];
    setSuggestedMove(match);
    setSelectedMoveId(match.id);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Camera className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">محرك الكاميرا السينمائية — Cinematic Camera Engine</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            مكتبة تضم 15 حركة كاميرا هوليوودية مدروسة درامياً مع نظام الاختيار الذكي المتوازن لتفادي الحركات المبالغ فيها.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-cine-900 border border-cine-800 px-3 py-1.5 rounded-xl text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>15 حركة معتمدة للمولدات السينمائية</span>
        </div>
      </div>

      {/* Smart Auto-Selector Bar */}
      <div className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>نظام الاختيار التلقائي الذكي بحسب الحالة الدرامية (Smart Camera Selector)</span>
          </div>
          <span className="text-[10px] text-zinc-500">يتجنب الحركات الصاخبة غير المبررة</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: "discovery", label: "لحظة اكتشاف مفاجئ أو صدمة" },
            { id: "epic", label: "لحظة انتصار وبطولة ملحمية" },
            { id: "chase", label: "مطاردة واستكشاف حركي سريع" },
            { id: "mystery", label: "شك وغموض وقلق نفسي" },
            { id: "heroic", label: "إبراز هيبة وعظمة الشخصية" },
            { id: "intimate", label: "تركيز على دليل أو سر دقيق" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleAutoSelect(item.id)}
              className={`px-3.5 py-2 rounded-xl transition-all border ${
                selectedMood === item.id
                  ? "bg-purple-600 text-white border-purple-500 shadow-glow-purple font-bold"
                  : "bg-cine-850 text-zinc-300 border-cine-700/60 hover:bg-cine-800 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Camera Library (5 cols) & Active Inspector (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Camera Moves List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
          {cameraMovements.map((move) => {
            const isSelected = move.id === selectedMove.id;
            return (
              <div
                key={move.id}
                onClick={() => setSelectedMoveId(move.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-cine-900 border-purple-500 shadow-glow-purple"
                    : "bg-cine-900/60 border-cine-800 hover:border-cine-700 hover:bg-cine-850"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-xs">{move.arabicName}</span>
                  <div className="flex items-center gap-1 font-mono text-[10px]">
                    <span className="text-zinc-500">شدة:</span>
                    <span className="text-cyan-400 font-bold">{move.intensity}/5</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 line-clamp-1 font-arabic">{move.description}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Movement Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl space-y-5">
            {/* Header */}
            <div className="border-b border-cine-800 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-purple-400 font-mono font-semibold uppercase tracking-wider">
                  {selectedMove.name}
                </span>
                <h2 className="text-xl font-black text-white mt-0.5">{selectedMove.arabicName}</h2>
              </div>
              <div className="flex items-center gap-1.5 bg-cine-850 px-3 py-1.5 rounded-xl border border-cine-700 text-xs">
                <span className="text-zinc-400 font-medium">مستوى الشدة الدرامية:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-2.5 h-4 rounded-sm ${
                        level <= selectedMove.intensity ? "bg-purple-500" : "bg-cine-800"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Simulation Display Box */}
            <div className="aspect-video bg-cine-950 rounded-2xl border border-cine-800 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-cyan-900/20" />
              <div className="relative z-10 space-y-3 max-w-md">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mx-auto animate-pulse">
                  <Film className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-white">محاكاة الحركة السينمائية</h4>
                <p className="text-xs text-zinc-400 font-arabic leading-relaxed">
                  توجيه العدسة: «{selectedMove.description}»
                </p>
              </div>

              {/* Crosshair overlays */}
              <div className="absolute inset-4 border border-white/5 rounded-xl pointer-events-none flex items-center justify-center">
                <div className="w-12 h-12 border border-cyan-400/20 rounded-full" />
              </div>
            </div>

            {/* Description & Impact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-cine-850 p-4 rounded-2xl border border-cine-800 space-y-1.5">
                <span className="font-semibold text-cyan-300 block">أفضل استخدامات المشهد</span>
                <p className="text-zinc-300 leading-relaxed font-arabic">{selectedMove.recommendedFor}</p>
              </div>

              <div className="bg-cine-850 p-4 rounded-2xl border border-cine-800 space-y-1.5">
                <span className="font-semibold text-purple-300 block">التأثير والوقع النفسي الدرامي</span>
                <p className="text-zinc-300 leading-relaxed font-arabic">{selectedMove.dramaticImpact}</p>
              </div>
            </div>

            {/* Prompt Parameter Syntax */}
            <div className="bg-cine-950 p-4 rounded-2xl border border-cine-800 space-y-2">
              <span className="text-xs font-bold text-zinc-400">صيغة توجيه الكاميرا في البرومبت (Adapter Syntax):</span>
              <div className="p-3 bg-cine-900 rounded-xl font-mono text-xs text-cyan-300 border border-cine-800">
                --camera-motion="{selectedMove.name}" --intensity={selectedMove.intensity} --cinematic-feel="balanced"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
