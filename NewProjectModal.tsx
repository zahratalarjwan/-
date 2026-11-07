"use client";

import { useState } from "react";
import { X, Sparkles, Film, Compass, Ratio } from "lucide-react";
import { MovieGenre, AspectRatio, VideoResolution, Project } from "@/types";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: Project) => void;
}

export default function NewProjectModal({ isOpen, onClose, onCreate }: NewProjectModalProps) {
  const [title, setTitle] = useState("");
  const [idea, setIdea] = useState("");
  const [genre, setGenre] = useState<MovieGenre>("adventure-comedy");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [resolution, setResolution] = useState<VideoResolution>("1080p");
  const [budget, setBudget] = useState(150);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      description: idea.trim() || "مشروع سينمائي جديد عبر CineFlow AI Studio",
      genre,
      aspectRatio,
      resolution,
      status: "planning",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
      directorPrompt: idea.trim(),
      scenesCount: 0,
      completedScenesCount: 0,
      totalCreditsUsed: 0,
      budgetCreditsLimit: budget,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onCreate(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-cine-900 border border-cine-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-cine-800 flex items-center justify-between bg-cine-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">إنشاء فيلم سينمائي جديد</h3>
              <p className="text-xs text-zinc-400 mt-0.5">تحديد الرؤية الإخراجية وإعدادات الإنتاج</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-cine-850 hover:bg-cine-800 flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Title */}
          <div>
            <label className="block font-semibold text-zinc-200 mb-1.5">عنوان الفيلم أو المشروع</label>
            <input
              type="text"
              required
              placeholder="مثال: أسطورة مغارة الهوتة مع عمر ورقية"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-cine-950 border border-cine-700 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Director Core Idea */}
          <div>
            <label className="block font-semibold text-zinc-200 mb-1.5">فكرة الفيلم أو القصة الأولية</label>
            <textarea
              rows={3}
              placeholder="اكتب الفكرة في بضعة أسطر وسيتولى المخرج الذكي تحويلها لسيناريو كامل ومشاهد وبرومبتات..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="w-full bg-cine-950 border border-cine-700 rounded-xl p-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Genre & Aspect Ratio */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-zinc-200 mb-1.5">تصنيف العمل (Genre)</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value as MovieGenre)}
                className="w-full bg-cine-950 border border-cine-700 rounded-xl px-3 py-2.5 text-zinc-200 focus:outline-none focus:border-purple-500"
              >
                <option value="adventure-comedy">مغامرات وكوميديا (عمر ورقية)</option>
                <option value="children">قصص أطفال هادفة</option>
                <option value="educational">فيديوهات تعليمية ووثائقية</option>
                <option value="short-film">أفلام قصيرة درامية</option>
                <option value="youtube-shorts">YouTube Shorts سينمائي</option>
                <option value="tiktok-reels">TikTok / Instagram Reels</option>
                <option value="commercial">إعلان تجاري سينمائي</option>
                <option value="product">فيديو منتج احترافي</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-200 mb-1.5">نسبة الأبعاد (Aspect Ratio)</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                className="w-full bg-cine-950 border border-cine-700 rounded-xl px-3 py-2.5 text-zinc-200 focus:outline-none focus:border-purple-500 font-mono"
              >
                <option value="16:9">16:9 سينمائي عريض (YouTube / TV)</option>
                <option value="9:16">9:16 طولي عمودي (Shorts / Reels / TikTok)</option>
                <option value="1:1">1:1 مربع (Instagram Feed)</option>
                <option value="2.39:1">2.39:1 شاشة سينما كبرى (Anamorphic)</option>
              </select>
            </div>
          </div>

          {/* Resolution & Budget */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-zinc-200 mb-1.5">الدقة المستهدفة</label>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value as VideoResolution)}
                className="w-full bg-cine-950 border border-cine-700 rounded-xl px-3 py-2.5 text-zinc-200 focus:outline-none focus:border-purple-500 font-mono"
              >
                <option value="1080p">1080p Full HD (موصى به)</option>
                <option value="720p">720p HD (سريع المعالجة)</option>
                <option value="4K">4K Ultra HD (متقدم)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-200 mb-1.5">ميزانية الأرصدة المعتمدة</label>
              <input
                type="number"
                min={20}
                max={1000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full bg-cine-950 border border-cine-700 rounded-xl px-3.5 py-2.5 text-zinc-200 focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-cine-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-cine-850 hover:bg-cine-800 text-zinc-300 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-semibold shadow-glow-purple hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>إنشاء المشروع وبدء الإخراج</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
