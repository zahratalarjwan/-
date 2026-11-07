"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Search,
  Plus,
  Lock,
  Layers,
  Camera,
  AlertCircle
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { ProductionMemoryRecord } from "@/types";

export default function ProductionMemoryPage() {
  const { memory } = useCineFlowStore();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = memory.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.learnedRule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inputPrompt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">ذاكرة الإنتاج الدائمة — Production Memory System</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            استرجاع الخبرات والبرومبتات المعتمدة وقواعد تثبيت الشخصيات الناجحة عبر ميزة «Learn From Approved Results».
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-cine-900 border border-cine-800 px-3.5 py-2 rounded-2xl text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{memory.length} قواعد وخبرات إنتاجية محفوظة</span>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="p-4 rounded-3xl bg-cine-900 border border-cine-800 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <Bookmark className="w-5 h-5" />
          </div>
          <p className="text-zinc-300 font-arabic leading-relaxed">
            <strong>مبدأ العمل الشفاف:</strong> الذاكرة تحفظ القواعد والبرومبتات والإعدادات التي اعتمدتها كمخرج، وتسترجعها تلقائياً لتوجيه المشاهد القادمة دون ادعاء إعادة تدريب النماذج الأساسية.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { id: "all", label: "جميع السجلات" },
            { id: "character-lock", label: "تثبيت الشخصيات (Character Lock)" },
            { id: "approved-prompt", label: "البرومبتات المعتمدة (Approved)" },
            { id: "camera-style", label: "تجارب الكاميرا (Camera Style)" },
            { id: "solution-log", label: "سجل الحلول وتفادي الأخطاء" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all border ${
                activeCategory === cat.id
                  ? "bg-purple-600 text-white border-purple-500 shadow-glow-purple font-bold"
                  : "bg-cine-850 text-zinc-400 border-cine-800 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-500 absolute right-3 top-2.5" />
          <input
            type="text"
            placeholder="بحث في القواعد والخبرات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cine-950 border border-cine-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Memory Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((record) => (
          <div
            key={record.id}
            className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl hover:border-purple-500/40 transition-all flex flex-col space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium ${
                record.category === "character-lock" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" :
                record.category === "approved-prompt" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                "bg-purple-500/20 text-purple-300 border border-purple-500/30"
              }`}>
                {record.category}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {new Date(record.timestamp).toLocaleDateString("ar-EG")}
              </span>
            </div>

            <h3 className="font-bold text-white text-sm leading-snug">{record.title}</h3>

            <div className="bg-cine-950 p-3 rounded-2xl border border-cine-850 space-y-1.5 flex-1 text-xs">
              <span className="text-[11px] font-semibold text-emerald-400 block font-arabic">
                القاعدة المستخلصة (Learned Rule):
              </span>
              <p className="text-zinc-300 leading-relaxed font-arabic">{record.learnedRule}</p>
            </div>

            <div className="text-[11px] text-zinc-500 font-mono truncate">
              المشهد: {record.sceneType}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
