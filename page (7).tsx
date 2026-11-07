"use client";

import { useState } from "react";
import {
  Mic,
  Volume2,
  Play,
  Pause,
  AlertTriangle,
  Sparkles,
  Plus,
  Trash2,
  Download,
  Languages,
  Clock,
  CheckCircle2,
  Scissors
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { DialogueLine, DialogueDialect, EmotionType } from "@/types";

export default function DialogueStudioPage() {
  const { dialogues, updateDialogues, characters } = useCineFlowStore();

  const [activeDialect, setActiveDialect] = useState<DialogueDialect>("fusha");
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string>("char-omar");
  const [inputText, setInputText] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>("amazed");
  const [allocatedDuration, setAllocatedDuration] = useState<number>(3.5);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);

  // Estimation calculation: 1 word ~ 0.35s in spoken Arabic
  const wordsCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const estimatedSeconds = Number((wordsCount * 0.36).toFixed(1));
  const isOverDuration = estimatedSeconds > allocatedDuration;

  const handleAddDialogue = () => {
    if (!inputText.trim()) return;
    const speaker = characters.find((c) => c.id === selectedSpeakerId) || characters[0];

    const newLine: DialogueLine = {
      id: `dial-${Date.now()}`,
      speakerId: speaker.id,
      speakerName: speaker.arabicName,
      arabicText: inputText.trim(),
      dialect: activeDialect,
      emotion: selectedEmotion,
      startTime: Number((dialogues.reduce((acc, d) => Math.max(acc, d.startTime + d.duration), 0)).toFixed(1)),
      duration: estimatedSeconds || 2.5,
      recommendedDuration: allocatedDuration,
      isOverLimit: isOverDuration,
      lipSyncCues: ["A_OPEN", "O_ROUND", "CLOSED", selectedEmotion.toUpperCase()]
    };

    updateDialogues([...dialogues, newLine]);
    setInputText("");
  };

  const handleShortenText = () => {
    const words = inputText.trim().split(/\s+/);
    if (words.length > 5) {
      const shortened = words.slice(0, Math.ceil(allocatedDuration / 0.36)).join(" ") + "!";
      setInputText(shortened);
    }
  };

  const handlePlayTTS = (lineId: string, text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isPlayingAudio === lineId) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-SA";
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(null);
      setIsPlayingAudio(lineId);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleExportSubtitles = async (format: "srt" | "vtt") => {
    try {
      const res = await fetch("/api/subtitles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dialogues, format })
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `subtitles.${format}`;
      a.click();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteDialogue = (id: string) => {
    updateDialogues(dialogues.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Mic className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">استوديو الحوار العربي — Arabic Dialogue Studio</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            كتابة وتوقيت الحوارات العربية الفصحى واللهجة العمانية، ضبط مدة النطق، توليد إشارات مزامنة الشفاه وتصدير ملفات الترجمة.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExportSubtitles("srt")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cine-850 hover:bg-cine-800 text-zinc-200 border border-cine-700 text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>تصدير SRT</span>
          </button>
          <button
            onClick={() => handleExportSubtitles("vtt")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cine-850 hover:bg-cine-800 text-zinc-200 border border-cine-700 text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>تصدير VTT</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Composer & Dialogues Timeline List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dialogue Composer (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-cine-800 pb-3">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>محرر السطر الحواري</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-arabic">بدون تشكيل افتراضياً</span>
          </div>

          {/* Dialect Selector */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setActiveDialect("fusha")}
              className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                activeDialect === "fusha"
                  ? "bg-purple-600/30 text-white border-purple-500 shadow-glow-purple"
                  : "bg-cine-950 text-zinc-400 border-cine-800 hover:text-white"
              }`}
            >
              العربية الفصحى (افتراضي)
            </button>
            <button
              type="button"
              onClick={() => setActiveDialect("omani")}
              className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                activeDialect === "omani"
                  ? "bg-purple-600/30 text-white border-purple-500 shadow-glow-purple"
                  : "bg-cine-950 text-zinc-400 border-cine-800 hover:text-white"
              }`}
            >
              اللهجة العمانية المحببة
            </button>
          </div>

          {/* Speaker Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">المتحدث (الشخصية)</label>
            <div className="grid grid-cols-3 gap-2">
              {characters.map((char) => {
                const isSelected = char.id === selectedSpeakerId;
                return (
                  <div
                    key={char.id}
                    onClick={() => setSelectedSpeakerId(char.id)}
                    className={`p-2 rounded-xl border cursor-pointer text-center transition-all ${
                      isSelected
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-cine-950 border-cine-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden mx-auto mb-1 border border-cine-700">
                      <img src={char.avatarUrl} alt={char.arabicName} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-bold block">{char.arabicName}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Emotion Tag */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">المشاعر والأحاسيس</label>
            <select
              value={selectedEmotion}
              onChange={(e) => setSelectedEmotion(e.target.value as EmotionType)}
              className="w-full bg-cine-950 border border-cine-700 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
            >
              <option value="amazed">دهشة وإعجاب (Amazed)</option>
              <option value="happy">فرح ومرح (Happy)</option>
              <option value="determined">عزيمة وحزم (Determined)</option>
              <option value="laughing">ضحك ودعابة (Laughing)</option>
              <option value="angry">غضب واستنكار (Angry)</option>
              <option value="sad">حزن وتأثر (Sad)</option>
              <option value="neutral">طبيعي هادئ (Neutral)</option>
            </select>
          </div>

          {/* Dialogue Text Area */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">نص الحوار العربي</label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب الحوار هنا (تلقائياً بدون تشكيل)..."
              className="w-full bg-cine-950 border border-cine-700 rounded-2xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 font-arabic leading-relaxed"
            />
          </div>

          {/* Timing & Pacing Guardrails */}
          <div className="bg-cine-950 p-3.5 rounded-2xl border border-cine-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">المدة المخصصة للمشهد:</span>
              <div className="flex items-center gap-1 font-mono">
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="15"
                  value={allocatedDuration}
                  onChange={(e) => setAllocatedDuration(Number(e.target.value))}
                  className="w-14 bg-cine-900 border border-cine-700 text-center rounded py-0.5 text-white"
                />
                <span className="text-zinc-500">ث</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">مدة النطق التقديرية ({wordsCount} كلمات):</span>
              <span className={`font-mono font-bold ${isOverDuration ? "text-rose-400" : "text-emerald-400"}`}>
                ~{estimatedSeconds} ثانية
              </span>
            </div>

            {isOverDuration && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-2 text-rose-300">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[11px]">تجاوز الحوار المدة المحددة!</span>
                </div>
                <button
                  type="button"
                  onClick={handleShortenText}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-[10px] font-semibold"
                >
                  <Scissors className="w-3 h-3" />
                  <span>اقتراح اختصار</span>
                </button>
              </div>
            )}
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddDialogue}
            disabled={!inputText.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-glow-purple disabled:opacity-50 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة السطر إلى الاستوديو</span>
          </button>
        </div>

        {/* Right Column: Dialogues Timeline (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>قائمة الحوارات الزمنية المسجلة ({dialogues.length} أسطر)</span>
            <span className="font-mono text-cyan-400">
              الوقت الإجمالي: {dialogues.reduce((acc, d) => Math.max(acc, d.startTime + d.duration), 0).toFixed(1)}s
            </span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
            {dialogues.map((item, idx) => (
              <div
                key={item.id}
                className="bg-cine-900 border border-cine-800 rounded-2xl p-4 space-y-3 hover:border-cine-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white">{item.speakerName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cine-850 text-cyan-300 border border-cine-800">
                      {item.dialect === "fusha" ? "فصحى" : "عماني"}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                      {item.emotion}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-400 bg-cine-950 px-2 py-0.5 rounded">
                      {item.startTime}s ➔ {(item.startTime + item.duration).toFixed(1)}s
                    </span>

                    <button
                      onClick={() => handlePlayTTS(item.id, item.arabicText)}
                      className="p-1.5 rounded-lg bg-cine-850 hover:bg-cine-800 text-cyan-400 hover:text-white"
                      title="معاينة الصوت"
                    >
                      {isPlayingAudio === item.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => deleteDialogue(item.id)}
                      className="p-1.5 rounded-lg bg-cine-850 hover:bg-rose-950 text-zinc-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Arabic Dialogue Text */}
                <p className="text-sm text-white font-arabic font-medium leading-relaxed bg-cine-950/60 p-3 rounded-xl border border-cine-850">
                  «{item.arabicText}»
                </p>

                {/* Lip Sync Cues */}
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                  <span className="text-purple-400">Lip-Sync Cues:</span>
                  <span>{item.lipSyncCues.join(" • ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
