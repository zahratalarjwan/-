"use client";

import { useState } from "react";
import {
  Sparkles,
  Film,
  Clapperboard,
  Video,
  Mic,
  Camera,
  Layers,
  Send,
  Check,
  Edit3,
  RefreshCw,
  Share2,
  Volume2,
  Sliders,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { MovieGenre, ScriptBreakdown, StoryboardScene, DialogueLine } from "@/types";

export default function AIDirectorPage() {
  const { project, updateProject, updateScenes, updateDialogues, cameraMovements } = useCineFlowStore();

  const [idea, setIdea] = useState(project.directorPrompt || "مغامرة استكشافية لعمر ورقية والروبوت فرفور في وادي دربات بصلالة بحثاً عن سر زهرة اللوتس النادرة");
  const [genre, setGenre] = useState<MovieGenre>(project.genre || "adventure-comedy");
  const [duration, setDuration] = useState("2-minutes");
  const [style, setStyle] = useState("3D Anime");
  const [targetAudience, setTargetAudience] = useState("الأطفال والعائلات 7-14 سنة");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBreakdown, setGeneratedBreakdown] = useState<ScriptBreakdown | null>(null);
  const [activeTab, setActiveTab] = useState<"screenplay" | "scenes" | "dialogues" | "prompts" | "publishing">("scenes");
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const presets = [
    { title: "سر واحة النجوم في وادي شاب", genre: "adventure-comedy" as MovieGenre },
    { title: "حراس قلعة نزوى وبوصلة الفلك", genre: "educational" as MovieGenre },
    { title: "مغامرة فرفور في سوق مطرح القديم", genre: "children" as MovieGenre },
    { title: "إعلان سنوي مبتكر لمهرجان عمان للابتكار", genre: "commercial" as MovieGenre },
    { title: "تحدي الرموز الأثرية (TikTok / Shorts)", genre: "youtube-shorts" as MovieGenre }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/director", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, genre, targetAudience, duration, style })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setGeneratedBreakdown(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyToProduction = () => {
    if (!generatedBreakdown) return;
    updateProject({
      title: generatedBreakdown.title,
      description: generatedBreakdown.synopsis,
      genre: generatedBreakdown.genre,
      scenesCount: generatedBreakdown.scenes.length
    });
    updateScenes(generatedBreakdown.scenes);
    updateDialogues(generatedBreakdown.dialogues);
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Clapperboard className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">المخرج الذكي — AI Film Director</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            محرك سينمائي متقدم يحول فكرتك إلى سيناريو كامل، تقسيم مشاهد، حوارات، زوايا كاميرا، وبرومبتات معتمدة.
          </p>
        </div>

        {generatedBreakdown && (
          <button
            onClick={handleApplyToProduction}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {appliedSuccess ? <Check className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
            <span>{appliedSuccess ? "تم الإرسال لخط الإنتاج بنجاح!" : "اعتماد ونقل إلى خط الإنتاج والاستوري بورد"}</span>
          </button>
        )}
      </div>

      {/* Main Grid: Form Inputs & Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Controls (4 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-cine-800 pb-3">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>مدخلات الرؤية الإخراجية</span>
          </div>

          {/* Quick Idea Presets */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">أفكار سينمائية مقترحة سريعة</label>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setIdea(p.title);
                    setGenre(p.genre);
                  }}
                  className="text-[11px] bg-cine-850 hover:bg-cine-800 text-zinc-300 px-2.5 py-1 rounded-lg border border-cine-700/60 hover:border-purple-500/50 transition-colors text-right"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* User Idea Prompt */}
          <div>
            <label className="block text-xs font-semibold text-zinc-200 mb-1.5">فكرة الفيلم أو القصة</label>
            <textarea
              rows={4}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="اكتب الفكرة الأساسية بالتفصيل الذي تريده..."
              className="w-full bg-cine-950 border border-cine-700 rounded-2xl p-3.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500 leading-relaxed"
            />
          </div>

          {/* Genre & Target Audience */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">نوع العمل</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value as MovieGenre)}
                className="w-full bg-cine-950 border border-cine-700 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
              >
                <option value="adventure-comedy">مغامرات وكوميديا</option>
                <option value="children">قصص أطفال</option>
                <option value="educational">فيديوهات تعليمية</option>
                <option value="short-film">أفلام قصيرة</option>
                <option value="youtube-shorts">YouTube Shorts</option>
                <option value="tiktok-reels">TikTok / Reels</option>
                <option value="commercial">إعلانات تجارية</option>
                <option value="product">فيديوهات منتجات</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">الجمهور المستهدف</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-cine-950 border border-cine-700 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Visual Style & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">الأسلوب البصري</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-cine-950 border border-cine-700 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
              >
                <option value="3D Anime">3D Anime (شخصيات عمر ورقية)</option>
                <option value="Pixar Style">Pixar 3D Cinematic</option>
                <option value="Photorealistic">واقعي سينمائي (Photorealistic)</option>
                <option value="Watercolor">ألوان مائية حالمة</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">المدة التقريبية</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-cine-950 border border-cine-700 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500 font-mono"
              >
                <option value="30-seconds">30 ثانية (Shorts/Reel)</option>
                <option value="60-seconds">60 ثانية (مشهد سريع)</option>
                <option value="2-minutes">دقيقتان (فيلم قصير)</option>
                <option value="5-minutes">5 دقائق (حلقة كاملة)</option>
              </select>
            </div>
          </div>

          {/* Generation Action Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !idea.trim()}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-glow-purple hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                <span>جاري إخراج الفيلم وبناء السيناريو والمشاهد...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>إخراج الفيلم وتوليد باقة الإنتاج الكاملة</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Area (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {!generatedBreakdown && !isGenerating ? (
            <div className="bg-cine-900 border border-cine-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[460px]">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Clapperboard className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">المخرج الذكي جاهز لبدء العمل</h3>
              <p className="text-xs text-zinc-400 max-w-md font-arabic leading-relaxed">
                أدخل فكرتك على اليمين ثم اضغط على زر الإخراج لتوليد فيلم متكامل يحتوي على: عنوان جذاب، ملخص، سيناريو، تقسيم مشاهد، زوايا كاميرا، حوارات، وبرومبتات.
              </p>
            </div>
          ) : isGenerating ? (
            <div className="bg-cine-900 border border-cine-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[460px] animate-pulse">
              <RefreshCw className="w-10 h-10 animate-spin text-purple-400" />
              <h3 className="text-base font-bold text-white">المخرج السينمائي يحلل الفكرة ويهندس المشاهد...</h3>
              <p className="text-xs text-zinc-400">تطبيق قواعد تثبيت الشخصيات، واختيار حركات الكاميرا المناسبة، وضبط إيقاع الحوار العربي.</p>
            </div>
          ) : generatedBreakdown && (
            <div className="bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl space-y-5">
              {/* Output Title & Synopsis Banner */}
              <div className="bg-cine-950 p-4 rounded-2xl border border-cine-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">العنوان المختار</span>
                  <span className="text-[11px] font-mono text-cyan-400">{generatedBreakdown.totalDurationSeconds} ثانية إجمالية</span>
                </div>
                <input
                  type="text"
                  value={generatedBreakdown.title}
                  onChange={(e) => setGeneratedBreakdown({ ...generatedBreakdown, title: e.target.value })}
                  className="w-full bg-transparent text-xl font-bold text-white focus:outline-none focus:border-b border-purple-500"
                />
                <textarea
                  rows={2}
                  value={generatedBreakdown.synopsis}
                  onChange={(e) => setGeneratedBreakdown({ ...generatedBreakdown, synopsis: e.target.value })}
                  className="w-full bg-transparent text-xs text-zinc-300 focus:outline-none focus:border-b border-purple-500 font-arabic leading-relaxed"
                />
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-cine-800 pb-2 text-xs overflow-x-auto">
                <button
                  onClick={() => setActiveTab("scenes")}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    activeTab === "scenes" ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  تقسيم المشاهد ({generatedBreakdown.scenes.length})
                </button>
                <button
                  onClick={() => setActiveTab("dialogues")}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    activeTab === "dialogues" ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  الحوارات العربية ({generatedBreakdown.dialogues.length})
                </button>
                <button
                  onClick={() => setActiveTab("prompts")}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    activeTab === "prompts" ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  البرومبتات والكاميرا
                </button>
                <button
                  onClick={() => setActiveTab("publishing")}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                    activeTab === "publishing" ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  خطة النشر والمونتاج
                </button>
              </div>

              {/* Tab: Scenes Breakdown */}
              {activeTab === "scenes" && (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                  {generatedBreakdown.scenes.map((sc, index) => {
                    const camMove = cameraMovements.find((c) => c.id === sc.cameraMovementId);
                    return (
                      <div key={sc.id} className="bg-cine-850 border border-cine-800 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">
                            المشهد #{index + 1}: {sc.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cine-800 text-cyan-300">
                            {sc.estimatedDuration} ثوانٍ • {sc.shotType}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-arabic">{sc.synopsis}</p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                          <div className="bg-cine-900 p-2 rounded-xl text-zinc-400">
                            <span className="text-purple-400 font-medium">حركة الكاميرا:</span>{" "}
                            {camMove?.arabicName || sc.cameraMovementId}
                          </div>
                          <div className="bg-cine-900 p-2 rounded-xl text-zinc-400">
                            <span className="text-cyan-400 font-medium">الإضاءة:</span> {sc.lighting}
                          </div>
                        </div>

                        {/* Sound Effects */}
                        {sc.soundEffects.length > 0 && (
                          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>المؤثرات: {sc.soundEffects.join(" ، ")}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab: Dialogues */}
              {activeTab === "dialogues" && (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                  {generatedBreakdown.dialogues.map((dial) => (
                    <div key={dial.id} className="bg-cine-850 border border-cine-800 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-purple-300 text-xs">{dial.speakerName}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-cine-800 text-zinc-400 font-mono">
                            {dial.duration} ث
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                            {dial.emotion}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-white leading-relaxed font-arabic font-medium">
                        «{dial.arabicText}»
                      </p>
                      <div className="text-[10px] text-zinc-500 font-mono">
                        Lip-Sync: {dial.lipSyncCues.join(" → ")}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Prompts & Camera */}
              {activeTab === "prompts" && (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                  {generatedBreakdown.scenes.map((sc, idx) => (
                    <div key={sc.id} className="bg-cine-850 border border-cine-800 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">برومبت المشهد #{idx + 1}</span>
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">
                          Google Flow / Veo Adapter
                        </span>
                      </div>
                      <div className="p-3 bg-cine-950 rounded-xl font-mono text-[11px] text-zinc-300 leading-relaxed border border-cine-800">
                        Omar: cute Omani boy, wearing traditional white dishdasha and detailed Omani kammah. Ruqayya: emerald green hijab. Setting: {sc.title}. Camera: {sc.cameraMovementId}. Lighting: {sc.lighting}.
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Publishing */}
              {activeTab === "publishing" && (
                <div className="bg-cine-850 border border-cine-800 rounded-2xl p-5 space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-purple-400 block mb-1">المنصة المستهدفة</label>
                    <span className="font-mono text-white text-sm">{generatedBreakdown.publishingPlan.platform}</span>
                  </div>
                  <div>
                    <label className="font-semibold text-cyan-400 block mb-1">خطاف جذب المشاهدين (Hook)</label>
                    <p className="text-zinc-200">{generatedBreakdown.publishingPlan.releaseHook}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-emerald-400 block mb-1">الدعوة للتفاعل (CTA)</label>
                    <p className="text-zinc-200">{generatedBreakdown.publishingPlan.cta}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
