"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Play,
  Film,
  Download,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Plus,
  ArrowRight,
  Sliders,
  Ratio,
  Clock,
  LayoutGrid
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { AspectRatio, Character } from "@/types";
import NewProjectModal from "@/components/NewProjectModal";

export default function SimplifiedStudioPage() {
  const { characters, scenes, updateScenes, project, updateProject } = useCineFlowStore();

  // Mode: "simple" (default clean generator) or "dashboard" (full analytics)
  const [studioMode, setStudioMode] = useState<"simple" | "dashboard">("simple");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simple direct generation states
  const [selectedCharId, setSelectedCharId] = useState<string>("char-omar");
  const [scenePrompt, setScenePrompt] = useState("عمر بالدشداشة والكمة العمانية يقف على برج قلعة نزوى عند الغروب متأملاً الأفق");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [duration, setDuration] = useState<number>(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState<string>("");
  const [directSuccess, setDirectSuccess] = useState(false);

  const selectedChar = characters.find((c) => c.id === selectedCharId) || characters[0];

  const presets = [
    { title: "عمر يستكشف واحة نزوى", prompt: "عمر بالدشداشة والكمة العمانية يتأمل فلج الخطمين في واحة نزوى عند الغروب، إضاءة ذهبية سينمائية 3D Anime" },
    { title: "رقية تفك الشفرة القديمة", prompt: "رقية بالحجاب الأخضر الزمردي الساتر تقرأ خريطة أثرية قديمة وتبتسم بفطنة، إضاءة شمسية ناعمة" },
    { title: "فرفور يحلق فوق القلعة", prompt: "الروبوت فرفور يحوم بسرعة فوق أسوار القلعة التاريخية وتومض عيناه الرقميتان بلون أزرق سماوي نيون" }
  ];

  const handleDirectGenerate = async () => {
    setIsGenerating(true);
    setGeneratedVideoUrl(null);
    setDirectSuccess(false);

    try {
      setGenerationStep("جاري الاتصال بحساب Google Flow...");
      await new Promise((r) => setTimeout(r, 600));

      setGenerationStep("تطبيق قيود تثبيت الشخصية (Character Lock) والأزياء...");
      await new Promise((r) => setTimeout(r, 700));

      setGenerationStep("جاري إرسال الطلب والتوليد السينمائي المباشر...");

      const res = await fetch("/api/google/flow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sceneTitle: scenePrompt.substring(0, 30),
          prompt: `${selectedChar.name}: ${selectedChar.visualSpecs.clothing}. Scene: ${scenePrompt}`,
          characterId: selectedChar.id,
          aspectRatio,
          duration
        })
      });

      const data = await res.json();
      if (data.success && data.videoUrl) {
        setGeneratedVideoUrl(data.videoUrl);
        setDirectSuccess(true);

        // Auto-add generated video to active scenes in store
        const newScene = {
          id: `flow-sc-${Date.now()}`,
          sceneNumber: scenes.length + 1,
          title: scenePrompt.substring(0, 35),
          synopsis: scenePrompt,
          estimatedDuration: duration,
          shotType: "Medium" as const,
          cameraAngle: "Eye Level" as const,
          cameraMovementId: "cam-dolly-in",
          lighting: "Cinematic Warm Sunlight",
          characterIds: [selectedChar.id],
          characterPoses: { [selectedChar.id]: "طبيعي سينمائي" },
          dialogueIds: [],
          soundEffects: ["هبوب نسيم ناعم"],
          ambientAudio: "أصوات هادئة",
          selectedImageUrl: selectedChar.avatarUrl,
          videoUrl: data.videoUrl,
          imageVariations: [],
          status: "Completed" as const,
          providerId: "google-flow",
          costEstimateCredits: 10
        };
        updateScenes([...scenes, newScene]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner & Mode Toggle */}
      <div className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Connected Google Account Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-[2px] shrink-0">
            <div className="w-full h-full bg-cine-950 rounded-[14px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">الاستوديو المباشر — Google Flow AI</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>حساب Google متصل ونشط</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 font-mono">
              cineflow.studio@gmail.com • وضع التوليد المباشر السريع
            </p>
          </div>
        </div>

        {/* Studio Mode Selector */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-cine-950 border border-cine-800 p-1.5 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setStudioMode("simple")}
            className={`px-4 py-2 rounded-xl transition-all ${
              studioMode === "simple"
                ? "bg-purple-600 text-white shadow-glow-purple font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            ⚡ استوديو التوليد المباشر البسيط
          </button>
          <button
            onClick={() => setStudioMode("dashboard")}
            className={`px-4 py-2 rounded-xl transition-all ${
              studioMode === "dashboard"
                ? "bg-purple-600 text-white shadow-glow-purple font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            📊 لوحة إدارة المشاريع
          </button>
        </div>
      </div>

      {studioMode === "simple" ? (
        /* ================= SIMPLE DIRECT FLOW STUDIO ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Direct Generation Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl">
            {/* Step 1: Character Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white flex items-center justify-between">
                <span>1. اختر الشخصية الأساسية (Character Lock دائم)</span>
                <span className="text-[11px] text-zinc-400 font-normal">تثبيت تلقائي للملابس والملامح</span>
              </label>

              <div className="grid grid-cols-3 gap-3">
                {characters.map((char) => {
                  const isSelected = char.id === selectedCharId;
                  return (
                    <div
                      key={char.id}
                      onClick={() => setSelectedCharId(char.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${
                        isSelected
                          ? "bg-purple-600/20 border-purple-500 shadow-glow-purple"
                          : "bg-cine-950 border-cine-800 hover:border-cine-700 text-zinc-400"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-cine-700 relative">
                        <img src={char.avatarUrl} alt={char.arabicName} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center text-white text-[9px] font-bold">
                            ✓
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{char.arabicName}</span>
                        <span className="text-[10px] text-zinc-400 font-arabic truncate max-w-[90px] block">
                          {char.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scene Prompt */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white">2. اكتب وصف المشهد المراد إنتاجه</label>
                <span className="text-[10px] text-cyan-400 font-mono">وضع Simple مباشر</span>
              </div>

              {/* Fast Presets */}
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setScenePrompt(p.prompt)}
                    className="text-[11px] bg-cine-850 hover:bg-cine-800 text-zinc-300 px-3 py-1 rounded-xl border border-cine-700/60 hover:border-purple-500 transition-colors"
                  >
                    {p.title}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                value={scenePrompt}
                onChange={(e) => setScenePrompt(e.target.value)}
                placeholder="صف ما يفعله عمر أو رقية في هذا المشهد..."
                className="w-full bg-cine-950 border border-cine-700 rounded-2xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 leading-relaxed font-arabic"
              />
            </div>

            {/* Step 3: Format & Duration */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-300">نسبة الأبعاد (Format)</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAspectRatio("16:9")}
                    className={`py-2 rounded-xl border text-center font-semibold transition-all ${
                      aspectRatio === "16:9"
                        ? "bg-purple-600/30 text-white border-purple-500"
                        : "bg-cine-950 text-zinc-400 border-cine-800 hover:text-white"
                    }`}
                  >
                    16:9 (يوتيوب)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAspectRatio("9:16")}
                    className={`py-2 rounded-xl border text-center font-semibold transition-all ${
                      aspectRatio === "9:16"
                        ? "bg-purple-600/30 text-white border-purple-500"
                        : "bg-cine-950 text-zinc-400 border-cine-800 hover:text-white"
                    }`}
                  >
                    9:16 (Shorts/TikTok)
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-300">مدة المشهد</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDuration(5)}
                    className={`py-2 rounded-xl border text-center font-semibold transition-all ${
                      duration === 5
                        ? "bg-purple-600/30 text-white border-purple-500"
                        : "bg-cine-950 text-zinc-400 border-cine-800 hover:text-white"
                    }`}
                  >
                    5 ثوانٍ
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuration(8)}
                    className={`py-2 rounded-xl border text-center font-semibold transition-all ${
                      duration === 8
                        ? "bg-purple-600/30 text-white border-purple-500"
                        : "bg-cine-950 text-zinc-400 border-cine-800 hover:text-white"
                    }`}
                  >
                    8 ثوانٍ
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Big Direct Generation Trigger */}
            <button
              onClick={handleDirectGenerate}
              disabled={isGenerating || !scenePrompt.trim()}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-glow-purple hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-amber-300" />
                  <span>{generationStep || "جاري إنتاج الفيديو مباشرة عبر Google Flow..."}</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-cyan-300 fill-cyan-300" />
                  <span>توليد الفيديو مباشرة بحساب Google في Flow</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Direct Video Monitor & Result (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-cine-800 pb-3">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-cyan-400" />
                  <span>شاشة العرض الفورية للمشهد الناتج</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {aspectRatio} • {duration}s
                </span>
              </div>

              {/* Video Player Display */}
              <div
                className={`mx-auto bg-black rounded-2xl overflow-hidden relative border border-cine-700/80 flex items-center justify-center transition-all ${
                  aspectRatio === "9:16" ? "aspect-[9/16] max-h-[380px]" : "aspect-video w-full"
                }`}
              >
                {generatedVideoUrl ? (
                  <video
                    src={generatedVideoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="p-6 text-center text-zinc-500 space-y-2">
                    <Film className="w-10 h-10 mx-auto opacity-40 text-purple-400" />
                    <p className="text-xs font-arabic">اضغط على زر التوليد بالأيسر لتشغيل المشهد هنا مباشرة</p>
                  </div>
                )}
              </div>

              {/* Actions upon completion */}
              {generatedVideoUrl && (
                <div className="space-y-2 animate-fade-in pt-1">
                  <a
                    href={generatedVideoUrl}
                    download="flow_generated_scene.mp4"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل الفيديو النهائي (Download MP4)</span>
                  </a>

                  <Link
                    href="/editor"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cine-850 hover:bg-cine-800 text-zinc-200 font-semibold text-xs border border-cine-700 transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    <span>فتح في استوديو المونتاج والقص (FFmpeg)</span>
                  </Link>
                </div>
              )}

              {/* Live scenes counter */}
              <div className="pt-2 border-t border-cine-800 flex items-center justify-between text-[11px] text-zinc-400">
                <span>المشاهد الجاهزة في المشروع:</span>
                <span className="font-mono text-cyan-400 font-bold">{scenes.length} مشاهد</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= FULL ADVANCED DASHBOARD ================= */
        <div className="space-y-6 animate-fade-in">
          {/* Production Stats Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-cine-900 border border-cine-800 rounded-2xl p-4">
              <span className="text-xs text-zinc-400 block mb-1">المشاهد المكتملة</span>
              <span className="text-2xl font-bold text-white font-mono">{scenes.length}</span>
            </div>
            <div className="bg-cine-900 border border-cine-800 rounded-2xl p-4">
              <span className="text-xs text-zinc-400 block mb-1">الشخصيات المثبتة</span>
              <span className="text-2xl font-bold text-white font-mono">{characters.length}</span>
            </div>
            <div className="bg-cine-900 border border-cine-800 rounded-2xl p-4">
              <span className="text-xs text-zinc-400 block mb-1">الأبعاد المعتمدة</span>
              <span className="text-2xl font-bold text-white font-mono">{project.aspectRatio}</span>
            </div>
            <div className="bg-cine-900 border border-cine-800 rounded-2xl p-4">
              <span className="text-xs text-zinc-400 block mb-1">حساب Google المتصل</span>
              <span className="text-sm font-bold text-emerald-400 truncate block">نشط ومصرح</span>
            </div>
          </div>

          {/* Fast Link Hub */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/director" className="p-4 bg-cine-900 border border-cine-800 rounded-2xl text-center hover:border-purple-500 transition-colors">
              <Sparkles className="w-5 h-5 mx-auto mb-1 text-purple-400" />
              <span className="text-xs font-bold text-white block">المخرج الذكي</span>
            </Link>
            <Link href="/storyboard" className="p-4 bg-cine-900 border border-cine-800 rounded-2xl text-center hover:border-cyan-500 transition-colors">
              <LayoutGrid className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
              <span className="text-xs font-bold text-white block">الاستوري بورد</span>
            </Link>
            <Link href="/editor" className="p-4 bg-cine-900 border border-cine-800 rounded-2xl text-center hover:border-amber-500 transition-colors">
              <Sliders className="w-5 h-5 mx-auto mb-1 text-amber-400" />
              <span className="text-xs font-bold text-white block">المونتاج والتصدير</span>
            </Link>
            <Link href="/providers" className="p-4 bg-cine-900 border border-cine-800 rounded-2xl text-center hover:border-emerald-500 transition-colors">
              <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
              <span className="text-xs font-bold text-white block">حسابات Google Flow</span>
            </Link>
          </div>
        </div>
      )}

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(newP) => updateProject(newP)}
      />
    </div>
  );
}
