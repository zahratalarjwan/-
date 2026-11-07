"use client";

import { useState } from "react";
import { X, Copy, Check, ExternalLink, ShieldCheck, Film, AlertCircle } from "lucide-react";
import { StoryboardScene, Character, CameraMovement } from "@/types";
import { generateScenePrompt } from "@/lib/promptGenerator";

interface AssistedFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  scene?: StoryboardScene;
  characters: Character[];
  cameraMovements: CameraMovement[];
  onSaveVideoUrl?: (sceneId: string, url: string) => void;
}

export default function AssistedFlowModal({
  isOpen,
  onClose,
  scene,
  characters,
  cameraMovements,
  onSaveVideoUrl
}: AssistedFlowModalProps) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !scene) return null;

  const currentCam = cameraMovements.find((c) => c.id === scene.cameraMovementId);
  const promptData = generateScenePrompt(scene, characters, currentCam, "simple", "google-flow");

  const copyToClipboard = (text: string, isNeg = false) => {
    navigator.clipboard.writeText(text);
    if (isNeg) {
      setCopiedNegative(true);
      setTimeout(() => setCopiedNegative(false), 2000);
    } else {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const handleSaveResult = () => {
    if (videoUrlInput.trim() && onSaveVideoUrl) {
      onSaveVideoUrl(scene.id, videoUrlInput.trim());
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-cine-900 border border-cine-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-cine-800 flex items-center justify-between bg-cine-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>الوضع المساعد — Assisted Flow Mode</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Google Flow Official Companion
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                تجهيز البرومبت وضوابط الشخصيات لنقلها إلى Google Flow بأمان تام
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-cine-850 hover:bg-cine-800 flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notice */}
        <div className="px-5 py-3 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-3 text-xs text-amber-200">
          <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            امتثالاً لسياسات Google الرسمية: يتم تجهيز الأوامر وضبط المشهد هنا، لتلصقها مباشرة في واجهة Flow دون المساس ببيانات اعتمادك أو أمان حسابك.
          </span>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Scene Summary */}
          <div className="bg-cine-850 p-3.5 rounded-xl border border-cine-800">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-white">المشهد #{scene.sceneNumber}: {scene.title}</span>
              <span className="text-zinc-400 font-mono">{scene.estimatedDuration} ثوانٍ • {scene.shotType}</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">{scene.synopsis}</p>
          </div>

          {/* Generated Flow Prompt */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-zinc-200 flex items-center gap-2">
                <span>البرومبت المعتمد لـ Google Flow (Simple Lock)</span>
              </label>
              <button
                onClick={() => copyToClipboard(promptData.promptText)}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30 transition-colors"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? "تم النسخ بنجاح!" : "نسخ البرومبت"}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={promptData.promptText}
              rows={4}
              className="w-full bg-cine-950 border border-cine-700 rounded-xl p-3 text-zinc-200 font-mono text-xs focus:outline-none"
            />
          </div>

          {/* Negative Prompt */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-zinc-200">القيود السلبية (Negative Constraints)</label>
              <button
                onClick={() => copyToClipboard(promptData.negativePrompt, true)}
                className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-cine-800 px-2.5 py-1 rounded-lg border border-cine-700"
              >
                {copiedNegative ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNegative ? "تم النسخ!" : "نسخ القيود"}</span>
              </button>
            </div>
            <input
              type="text"
              readOnly
              value={promptData.negativePrompt}
              className="w-full bg-cine-950 border border-cine-700 rounded-xl p-2.5 text-zinc-300 font-mono text-xs focus:outline-none"
            />
          </div>

          {/* Action Step: Open Google Flow */}
          <div className="bg-cine-950 p-4 rounded-xl border border-cine-800 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">الخطوة التالية: افتح منصة Google Flow</p>
              <p className="text-zinc-400 mt-0.5">الصق البرومبت في خانة التوليد، وأنشئ المشهد.</p>
            </div>
            <a
              href="https://labs.google/flow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-95 shadow-glow-purple"
            >
              <span>فتح Google Flow</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Save Output Link */}
          <div className="border-t border-cine-800 pt-3">
            <label className="block font-semibold text-zinc-300 mb-1">
              حفظ رابط الفيديو المولد من Flow (اختياري للربط بالتايم لاين)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://... أو مسار ملف الفيديو الناتج"
                value={videoUrlInput}
                onChange={(e) => setVideoUrlInput(e.target.value)}
                className="flex-1 bg-cine-950 border border-cine-700 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleSaveResult}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
              >
                {savedSuccess ? "تم الحفظ!" : "حفظ الرابط"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
