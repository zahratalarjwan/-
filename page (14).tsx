"use client";

import { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  Sparkles,
  Download,
  Image as ImageIcon,
  Film,
  Tag,
  Youtube,
  ShieldCheck,
  ExternalLink,
  Info
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";

export default function YouTubePublishingPage() {
  const { project, scenes, dialogues } = useCineFlowStore();

  const titleOptions = [
    `سر واحة النجوم المفقودة! 🌟 ما وجده عمر ورقية في قلب الجبل أذهل الجميع`,
    `مغامرة عمر ورقية وفرفور في عُمان | رحلة سينمائية كاملة 3D Anime`,
    `لن تصدق ماذا كشف الروبوت فرفور في أودية نزوى! 😱 فيلم أنيميشن قصير`
  ];

  const [selectedTitle, setSelectedTitle] = useState(titleOptions[0]);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  // Generate chapters
  let accumulatedTime = 0;
  const chapters = scenes.map((sc, i) => {
    const mins = Math.floor(accumulatedTime / 60);
    const secs = accumulatedTime % 60;
    const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    accumulatedTime += sc.estimatedDuration;
    return `${timeStr} - ${sc.title}`;
  });

  const fullDescription = `فيلم سينمائي قصير من إنتاج CineFlow AI Studio
العنوان: ${selectedTitle}

ملخص الفيلم:
${project.description}

فصول الفيلم (Timestamps):
${chapters.join("\n")}

الأبطال:
- عمر: الطفل العماني الشجاع بالدشداشة والكمة العمانية
- رقية: الطفلة الذكية بالحجاب الأخضر المطرز
- فرفور: الروبوت الطائر المساعد

تمت هندسة المشاهد والإخراج ومزامنة الحوار العربي بالكامل عبر CineFlow AI Studio.
اشترك في القناة ليصلك كل جديد من مغامراتنا السينمائية القادمة!`;

  const tagsList = [
    "#عمر_ورقية",
    "#فرفور",
    "#أنيميشن_عماني",
    "#CineFlow",
    "#أفلام_ذكاء_اصطناعي",
    "#GoogleFlow",
    "#أفلام_قصيرة",
    "#سينما_الأطفال"
  ];

  const copyText = (text: string, type: "title" | "desc" | "tags") => {
    navigator.clipboard.writeText(text);
    if (type === "title") {
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2000);
    } else if (type === "desc") {
      setCopiedDesc(true);
      setTimeout(() => setCopiedDesc(false), 2000);
    } else {
      setCopiedTags(true);
      setTimeout(() => setCopiedTags(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Share2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">استوديو النشر واليوتيوب — YouTube Publishing Studio</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            تجهيز بيانات النشر المحسنة للظهور وخوارزميات اليوتيوب: عناوين ذات نقر عالٍ، وصف زمني بالفصول، ووسوم دقيقة.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-cine-900 border border-cine-800 px-3.5 py-2 rounded-2xl text-xs text-zinc-300">
          <Youtube className="w-4 h-4 text-red-500" />
          <span>YouTube API: الوضع اليدوي / التجهيز (Manual Companion)</span>
        </div>
      </div>

      {/* API Notice */}
      <div className="p-3.5 bg-cine-900 border border-cine-800 rounded-2xl flex items-center gap-2.5 text-xs text-zinc-400 font-arabic">
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong>حالة النشر:</strong> يتم تجهيز باقة النشر كاملة للنسخ والتنزيل المباشر. الرفع التلقائي عبر YouTube Data API v3 متاح كإضافة اختيارية تتطلب مفتاح تفويض OAuth رسمي خاص بقناتك في ملف البيئة.
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Title, Description, Tags (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Title Options */}
          <div className="bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-cine-800 pb-3">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>اقتراحات العناوين الجذابة (High CTR Viral Titles)</span>
              </span>
              <button
                onClick={() => copyText(selectedTitle, "title")}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300"
              >
                {copiedTitle ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTitle ? "تم النسخ!" : "نسخ العنوان"}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {titleOptions.map((title, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedTitle(title)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-xs font-arabic leading-relaxed flex items-center justify-between gap-3 ${
                    selectedTitle === title
                      ? "bg-purple-600/20 border-purple-500 text-white shadow-glow-purple font-bold"
                      : "bg-cine-850 border-cine-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <span>{title}</span>
                  {selectedTitle === title && <span className="text-[10px] text-purple-300 shrink-0 font-mono">المختار</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Description with Timestamps */}
          <div className="bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-cine-800 pb-3">
              <span className="text-xs font-bold text-white">الوصف السينمائي الشامل مع الفصول (Timestamps)</span>
              <button
                onClick={() => copyText(fullDescription, "desc")}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300"
              >
                {copiedDesc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDesc ? "تم النسخ!" : "نسخ الوصف"}</span>
              </button>
            </div>

            <textarea
              readOnly
              rows={8}
              value={fullDescription}
              className="w-full bg-cine-950 border border-cine-700 rounded-2xl p-3.5 text-xs text-zinc-300 font-arabic leading-relaxed focus:outline-none"
            />
          </div>

          {/* Hashtags & Keywords */}
          <div className="bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-cine-800 pb-3">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-cyan-400" />
                <span>الهاشتاجات والكلمات المفتاحية (Tags)</span>
              </span>
              <button
                onClick={() => copyText(tagsList.join(" "), "tags")}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300"
              >
                {copiedTags ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTags ? "تم النسخ!" : "نسخ الكل"}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tagsList.map((tag, i) => (
                <span
                  key={i}
                  className="bg-cine-850 border border-cine-700/80 px-3 py-1.5 rounded-xl text-xs text-zinc-300 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Thumbnail Designer Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-cine-800 pb-3">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                <span>معاينة الصورة المصغرة (Thumbnail Concept)</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">16:9 • 1280x720</span>
            </div>

            {/* Thumbnail Canvas Visual */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative border border-cine-700 shadow-2xl flex flex-col justify-end p-5 group">
              <img
                src={scenes[0]?.selectedImageUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800"}
                alt="Thumbnail Background"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="relative z-10 space-y-1.5">
                <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                  FULL MOVIE
                </span>
                <h3 className="text-sm font-black text-white leading-tight font-arabic drop-shadow-md">
                  {selectedTitle}
                </h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-amber-300 font-bold bg-black/60 px-2 py-0.5 rounded-full border border-amber-400/30">
                    3D Anime عُماني
                  </span>
                  <span className="text-[10px] text-cyan-300 font-bold bg-black/60 px-2 py-0.5 rounded-full border border-cyan-400/30">
                    4K Ultra HD
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 font-arabic leading-relaxed">
              تصميم يعتمد على إبراز الوجه المعبر لعمر والكمة العمانية مع خط عربي سينمائي عريض يجذب المشاهدين.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
