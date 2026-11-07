"use client";

import { useState, useRef } from "react";
import {
  LayoutGrid,
  Film,
  Camera,
  Layers,
  Sparkles,
  MoveLeft,
  MoveRight,
  Plus,
  Trash2,
  ExternalLink,
  Upload,
  Check,
  Video,
  Sun,
  Eye,
  SlidersHorizontal
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { StoryboardScene } from "@/types";
import AssistedFlowModal from "@/components/AssistedFlowModal";

export default function StoryboardPage() {
  const { scenes, updateScenes, characters, cameraMovements, updateSceneStatus } = useCineFlowStore();
  const [activeSceneForFlow, setActiveSceneForFlow] = useState<StoryboardScene | null>(null);
  const [selectedSceneId, setSelectedSceneId] = useState<string>(scenes[0]?.id || "");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [uploadTargetSceneId, setUploadTargetSceneId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const moveScene = (index: number, direction: "prev" | "next") => {
    if ((direction === "prev" && index === 0) || (direction === "next" && index === scenes.length - 1)) return;
    const targetIndex = direction === "prev" ? index - 1 : index + 1;
    const updated = [...scenes];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // re-number scenes
    const renumbered = updated.map((sc, i) => ({ ...sc, sceneNumber: i + 1 }));
    updateScenes(renumbered);
  };

  const handleConvertToVideoTask = (sceneId: string) => {
    updateSceneStatus(sceneId, "Ready");
    const target = scenes.find((s) => s.id === sceneId);
    if (target) {
      setActiveSceneForFlow(target);
    }
  };

  const handleTriggerUpload = (sceneId: string) => {
    setUploadTargetSceneId(sceneId);
    fileInputRef.current?.click();
  };

  const handleSceneImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTargetSceneId) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("نوع الملف غير مدعوم. يرجى اختيار صورة PNG أو JPG أو WebP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("حجم الصورة يتجاوز الحد الأقصى (5 ميجابايت).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const next = scenes.map((s) =>
          s.id === uploadTargetSceneId
            ? { ...s, selectedImageUrl: dataUrl, imageVariations: [...s.imageVariations, dataUrl] }
            : s
        );
        updateScenes(next);
      }
    };
    reader.readAsDataURL(file);
  };

  const addScene = () => {
    const newSc: StoryboardScene = {
      id: `sc-new-${Date.now()}`,
      sceneNumber: scenes.length + 1,
      title: `مشهد جديد #${scenes.length + 1}`,
      synopsis: "وصف تفاصيل المشهد وحركة الشخصيات...",
      estimatedDuration: 5,
      shotType: "Medium",
      cameraAngle: "Eye Level",
      cameraMovementId: "cam-dolly-in",
      lighting: "Cinematic natural lighting",
      characterIds: ["char-omar"],
      characterPoses: { "char-omar": "وقفة تفكير واستكشاف" },
      dialogueIds: [],
      soundEffects: ["مؤثر صوتي طبيعي"],
      ambientAudio: "أصوات هادئة",
      selectedImageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
      imageVariations: [],
      status: "Draft",
      providerId: "google-flow",
      costEstimateCredits: 10
    };
    updateScenes([...scenes, newSc]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hidden file input for scene image upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/webp"
        onChange={handleSceneImageUpload}
        className="hidden"
      />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">محرر الاستوري بورد — Smart Storyboard Generator</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            إدارة اللوحات القصصية، تحديد زوايا الكاميرا، وضعيات الشخصيات، والإضاءة، مع إمكانية تحويل أي مشهد إلى أمر توليد فيديو مباشر.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-cine-900 border border-cine-800 p-1 rounded-xl flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                viewMode === "grid" ? "bg-purple-600 text-white font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              شبكة المشاهد
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                viewMode === "timeline" ? "bg-purple-600 text-white font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              التايم لاين البصري
            </button>
          </div>

          <button
            onClick={addScene}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-glow-purple hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة لوحة مشهد</span>
          </button>
        </div>
      </div>

      {/* Storyboard Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((scene, index) => {
            const camMove = cameraMovements.find((c) => c.id === scene.cameraMovementId);
            return (
              <div
                key={scene.id}
                className="bg-cine-900 border border-cine-800 rounded-3xl overflow-hidden shadow-xl hover:border-purple-500/40 transition-all flex flex-col group"
              >
                {/* Scene Card Header */}
                <div className="p-4 bg-cine-950 border-b border-cine-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center font-mono text-xs font-bold">
                      {scene.sceneNumber}
                    </span>
                    <h3 className="font-bold text-white text-xs truncate max-w-[150px]">{scene.title}</h3>
                  </div>

                  {/* Ordering arrows & upload */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTriggerUpload(scene.id)}
                      className="p-1 rounded bg-cine-850 hover:bg-cine-800 text-zinc-400 hover:text-cyan-400"
                      title="رفع صورة للمشهد"
                    >
                      <Upload className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveScene(index, "prev")}
                      disabled={index === 0}
                      className="p-1 rounded bg-cine-850 hover:bg-cine-800 text-zinc-400 hover:text-white disabled:opacity-30"
                      title="تحريك للخلف"
                    >
                      <MoveRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveScene(index, "next")}
                      disabled={index === scenes.length - 1}
                      className="p-1 rounded bg-cine-850 hover:bg-cine-800 text-zinc-400 hover:text-white disabled:opacity-30"
                      title="تحريك للأمام"
                    >
                      <MoveLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Scene Poster / Frame */}
                <div className="aspect-video bg-cine-950 relative overflow-hidden">
                  {scene.selectedImageUrl ? (
                    <img
                      src={scene.selectedImageUrl}
                      alt={scene.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      onClick={() => handleTriggerUpload(scene.id)}
                      className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-2 cursor-pointer hover:text-zinc-400"
                    >
                      <Film className="w-8 h-8" />
                      <span className="text-xs">اضغط لرفع صورة المشهد</span>
                    </div>
                  )}

                  {/* Top badges */}
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 text-cyan-300 backdrop-blur-sm border border-cyan-500/30">
                      {scene.estimatedDuration}s • {scene.shotType}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium backdrop-blur-sm ${
                      scene.status === "Completed" ? "bg-emerald-500/80 text-white" :
                      scene.status === "Review" ? "bg-amber-500/80 text-white" : "bg-black/70 text-zinc-300"
                    }`}>
                      {scene.status}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 flex-1 space-y-3 text-xs">
                  <p className="text-zinc-300 leading-relaxed font-arabic line-clamp-2">
                    {scene.synopsis}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-cine-850 p-2 rounded-xl text-zinc-400 truncate">
                      <span className="text-purple-400 font-medium">الزاوية:</span> {scene.cameraAngle}
                    </div>
                    <div className="bg-cine-850 p-2 rounded-xl text-zinc-400 truncate">
                      <span className="text-cyan-400 font-medium">الحركة:</span> {camMove?.arabicName.split("(")[0] || scene.cameraMovementId}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-cine-800 flex items-center gap-2">
                    <button
                      onClick={() => handleConvertToVideoTask(scene.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold transition-all"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>تحويل لطلب توليد فيديو</span>
                    </button>

                    <button
                      onClick={() => setActiveSceneForFlow(scene)}
                      className="px-2.5 py-2 rounded-xl bg-cine-850 hover:bg-cine-800 text-cyan-400 border border-cine-700"
                      title="الوضع المساعد لـ Google Flow"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Timeline Horizontal Strip View */
        <div className="bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-cine-800 pb-3">
            <span>تسلسل المشاهد على المسار الزمني (Timeline Reel)</span>
            <span className="font-mono text-cyan-400">
              إجمالي المدة: {scenes.reduce((acc, s) => acc + s.estimatedDuration, 0)} ثانية
            </span>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {scenes.map((scene, i) => (
              <div
                key={scene.id}
                className="w-64 shrink-0 bg-cine-850 border border-cine-700 rounded-2xl overflow-hidden space-y-2 p-3"
              >
                <div className="aspect-video bg-cine-950 rounded-xl overflow-hidden relative">
                  {scene.selectedImageUrl && (
                    <img src={scene.selectedImageUrl} alt={scene.title} className="w-full h-full object-cover" />
                  )}
                  <span className="absolute top-1 right-1 text-[10px] bg-black/70 text-white px-1.5 rounded font-mono">
                    #{i + 1}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">{scene.title}</div>
                <div className="text-[11px] text-zinc-400 font-mono">{scene.estimatedDuration}s • {scene.shotType}</div>
                <button
                  onClick={() => setActiveSceneForFlow(scene)}
                  className="w-full text-center py-1.5 bg-purple-600/20 text-purple-300 rounded-lg text-[11px] font-semibold hover:bg-purple-600 hover:text-white transition-colors"
                >
                  فتح في Assisted Flow
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assisted Flow Companion Modal */}
      <AssistedFlowModal
        isOpen={!!activeSceneForFlow}
        onClose={() => setActiveSceneForFlow(null)}
        scene={activeSceneForFlow || undefined}
        characters={characters}
        cameraMovements={cameraMovements}
        onSaveVideoUrl={(scId, url) => {
          updateSceneStatus(scId, "Completed");
        }}
      />
    </div>
  );
}
