"use client";

import { useState } from "react";
import {
  Terminal,
  Copy,
  Check,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  Sliders,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { PromptMode } from "@/types";
import { generateScenePrompt } from "@/lib/promptGenerator";

export default function PromptEnginePage() {
  const { scenes, characters, cameraMovements, promptMode, changePromptMode } = useCineFlowStore();
  const [selectedSceneId, setSelectedSceneId] = useState<string>(scenes[0]?.id || "");
  const [selectedProvider, setSelectedProvider] = useState<"google-flow" | "veo" | "runway" | "higgsfield" | "universal">("google-flow");
  const [copied, setCopied] = useState(false);

  const selectedScene = scenes.find((s) => s.id === selectedSceneId) || scenes[0];
  const camMove = cameraMovements.find((c) => c.id === selectedScene?.cameraMovementId);

  const generated = selectedScene
    ? generateScenePrompt(selectedScene, characters, camMove, promptMode, selectedProvider)
    : null;

  const handleCopy = () => {
    if (generated) {
      navigator.clipboard.writeText(generated.promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Terminal className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">مولد البرومبتات السينمائي — Prompt Engineering Engine</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            صياغة برومبتات دقيقة متوافقة مع Google Flow وVeo وRunway وHiggsfield مع تثبيت الشخصيات وضوابط الكاميرا والإضاءة.
          </p>
        </div>

        {/* 3 Modes Switch */}
        <div className="bg-cine-900 border border-cine-800 p-1.5 rounded-2xl flex items-center gap-1.5 text-xs">
          <button
            onClick={() => changePromptMode("simple")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              promptMode === "simple"
                ? "bg-purple-600 text-white shadow-glow-purple"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Simple (افتراضي عمر ورقية)
          </button>
          <button
            onClick={() => changePromptMode("professional")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              promptMode === "professional"
                ? "bg-purple-600 text-white shadow-glow-purple"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Professional
          </button>
          <button
            onClick={() => changePromptMode("advanced")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              promptMode === "advanced"
                ? "bg-purple-600 text-white shadow-glow-purple"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Mode Advisory Notice */}
      {promptMode === "simple" && (
        <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between text-xs text-purple-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              <strong>وضع Simple مفعل افتراضيًا:</strong> أثبتت تجارب إنتاج حلقات عمر ورقية أن البرومبت القصير المباشر يمنح أعلى ثبات للكمة والملامح دون تشويش.
            </span>
          </div>
          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
            Optimized for Omar & Ruqayya
          </span>
        </div>
      )}

      {/* Selector Toolbar */}
      <div className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        {/* Scene Picker */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-zinc-300">المشهد المستهدف:</label>
          <select
            value={selectedScene?.id}
            onChange={(e) => setSelectedSceneId(e.target.value)}
            className="bg-cine-950 border border-cine-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-arabic"
          >
            {scenes.map((sc) => (
              <option key={sc.id} value={sc.id}>
                المشهد #{sc.sceneNumber}: {sc.title}
              </option>
            ))}
          </select>
        </div>

        {/* Platform Adapter Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">المنصة المستهدفة:</span>
          {(["google-flow", "veo", "runway", "higgsfield", "universal"] as const).map((prov) => (
            <button
              key={prov}
              onClick={() => setSelectedProvider(prov)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all border ${
                selectedProvider === prov
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500 shadow-glow-cyan"
                  : "bg-cine-850 text-zinc-400 border-cine-800 hover:text-white"
              }`}
            >
              {prov === "google-flow" ? "Google Flow" : prov === "veo" ? "Google Veo" : prov === "runway" ? "Runway" : prov === "higgsfield" ? "Higgsfield" : "Universal"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Prompt Inspector Card */}
      {generated && (
        <div className="bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-cine-800 pb-4">
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>البرومبت السينمائي المولد ({selectedProvider.toUpperCase()})</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-mono mt-0.5 block">
                تقدير الحجم: {generated.estimatedTokens} رمز (Tokens)
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-glow-purple hover:scale-105 active:scale-95 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "تم النسخ بنجاح!" : "نسخ البرومبت بالكامل"}</span>
            </button>
          </div>

          {/* Generated Text Area */}
          <div className="p-4 bg-cine-950 rounded-2xl border border-cine-700/80 font-mono text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap select-all">
            {generated.promptText}
          </div>

          {/* Prompt Breakdown Elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-cine-850 p-4 rounded-2xl border border-cine-800 space-y-1">
              <span className="font-semibold text-purple-300 block">توجيه الكاميرا (Camera Rig)</span>
              <p className="text-zinc-300 font-mono text-[11px]">{generated.cameraPrompt}</p>
            </div>

            <div className="bg-cine-850 p-4 rounded-2xl border border-cine-800 space-y-1">
              <span className="font-semibold text-cyan-300 block">الإضاءة والبيئة (Lighting)</span>
              <p className="text-zinc-300 font-mono text-[11px]">{generated.lightingPrompt}</p>
            </div>

            <div className="bg-cine-850 p-4 rounded-2xl border border-cine-800 space-y-1">
              <span className="font-semibold text-amber-300 block">الحوارات المرتبطة (Dialogues)</span>
              <p className="text-zinc-300 font-mono text-[11px]">{generated.dialogueSummary}</p>
            </div>
          </div>

          {/* Negative Constraints Box */}
          <div className="bg-cine-950 p-4 rounded-2xl border border-rose-500/20 space-y-2">
            <span className="font-semibold text-rose-300 text-xs block">
              البرومبت السلبي المعتمد (Negative Prompt / Exclusions)
            </span>
            <p className="font-mono text-xs text-zinc-400">{generated.negativePrompt}</p>
          </div>
        </div>
      )}
    </div>
  );
}
