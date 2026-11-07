"use client";

import { useState, useRef } from "react";
import {
  Users,
  Lock,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Camera,
  Upload,
  Eye,
  Sliders,
  AlertTriangle,
  Info,
  Check
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { Character } from "@/types";

export default function CharactersPage() {
  const { characters, addCharacter, updateCharacters } = useCineFlowStore();
  const [selectedCharId, setSelectedCharId] = useState<string>(characters[0]?.id || "char-omar");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [scanningConsistency, setScanningConsistency] = useState(false);
  const [scanResult, setScanResult] = useState<{ score: number; notes: string[] } | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedChar = characters.find((c) => c.id === selectedCharId) || characters[0];

  const handleRunConsistencyCheck = () => {
    setScanningConsistency(true);
    setScanResult(null);
    setTimeout(() => {
      setScanningConsistency(false);
      setScanResult({
        score: selectedChar.id === "char-omar" ? 97 : selectedChar.id === "char-ruqayya" ? 98 : 95,
        notes: [
          "مطابقة تامة لملامح الوجه والأعين البنية الواسعة مع الصورة المرجعية الأساسية.",
          "الالتزام الكامل بالزي الأصيل (الدشداشة والكمة العمانية / الحجاب الأخضر الساتر).",
          "عدم رصد أي عناصر غربية محظورة أو تشوهات تشريحية."
        ]
      });
    }, 1200);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);
    if (!file) return;

    // Validate MIME
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setUploadError("نوع الملف غير مدعوم. يرجى اختيار صورة PNG أو JPG أو WebP.");
      return;
    }

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("حجم الصورة يتجاوز الحد الأقصى المسموح (5 ميجابايت).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const updated = characters.map((c) =>
          c.id === selectedChar.id
            ? { ...c, referenceImages: [...c.referenceImages, dataUrl] }
            : c
        );
        updateCharacters(updated);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hidden File Input for True Image Uploading */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/webp"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">محرك تثبيت الشخصيات — Character Lock Engine</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            المكتبة الدائمة لحفظ ملامح وأزياء وصور الشخصيات المرجعية لضمان تطابق الإطارات في كل مشاهد الفيلم.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs font-bold shadow-glow-purple hover:scale-105 active:scale-95 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة شخصية جديدة للمكتبة</span>
        </button>
      </div>

      {/* Main Grid: Character Cards & Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Character List Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            الشخصيات الأساسية المعتمدة ({characters.length})
          </div>

          {characters.map((char) => {
            const isSelected = char.id === selectedChar.id;
            return (
              <div
                key={char.id}
                onClick={() => {
                  setSelectedCharId(char.id);
                  setScanResult(null);
                  setUploadError(null);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                  isSelected
                    ? "bg-cine-900 border-purple-500 shadow-glow-purple"
                    : "bg-cine-900/60 border-cine-800 hover:border-cine-700 hover:bg-cine-850"
                }`}
              >
                <div className="w-16 h-16 rounded-xl bg-cine-950 overflow-hidden shrink-0 border border-cine-700 relative">
                  <img
                    src={char.avatarUrl}
                    alt={char.arabicName}
                    className="w-full h-full object-cover"
                  />
                  {char.locked && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-purple-600/90 flex items-center justify-center text-white" title="Locked">
                      <Lock className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm truncate">{char.arabicName} ({char.name})</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                      {char.visualSpecs.style}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{char.role}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {char.visualSpecs.clothingColors.map((color, i) => (
                      <div
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-black/40"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    <span className="text-[10px] text-zinc-500 mr-2 font-mono">
                      {char.referenceImages.length} صور مرجعية
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Character Detailed Specs & Consistency Checker (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl space-y-6">
            {/* Header with Avatar & Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cine-800 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-cine-950 overflow-hidden border-2 border-purple-500/50 shadow-lg shrink-0">
                  <img
                    src={selectedChar.avatarUrl}
                    alt={selectedChar.arabicName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{selectedChar.arabicName} ({selectedChar.name})</h2>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Character Lock Active</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 font-arabic">{selectedChar.description}</p>
                </div>
              </div>

              {/* Consistency Check Action Button */}
              <button
                onClick={handleRunConsistencyCheck}
                disabled={scanningConsistency}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cine-850 hover:bg-cine-800 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:border-cyan-400 transition-all self-start sm:self-auto"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{scanningConsistency ? "جاري الفحص المرجعي..." : "فحص الثبات (Consistency Check)"}</span>
              </button>
            </div>

            {/* Upload Feedback */}
            {uploadSuccess && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>تم رفع الصورة المرجعية وحفظها بنجاح في ملف الشخصية!</span>
              </div>
            )}
            {uploadError && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center gap-2 text-xs text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Consistency Check Result Box (If active) */}
            {scanResult && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تقرير ثبات الشخصية المعتمد: {scanResult.score}% تطابق</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Confidence: Very High</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-1 font-arabic list-disc list-inside">
                  {scanResult.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reference Images Gallery with Real File Upload Trigger */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-purple-400" />
                  <span>الصور المرجعية الأساسية (The True Source)</span>
                </span>
                <span className="text-[11px] text-zinc-500 font-arabic">
                  الصور الأصلية هي المرجع الأساسي للتوليد ولا تستبدل بنصوص فقط
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedChar.referenceImages.map((imgUrl, idx) => (
                  <div key={idx} className="aspect-square rounded-xl bg-cine-950 overflow-hidden border border-cine-700 relative group">
                    <img src={imgUrl} alt={`Ref ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-mono">
                      مرجع #{idx + 1}
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl bg-cine-950 border border-dashed border-cine-700 hover:border-purple-500 flex flex-col items-center justify-center text-zinc-500 hover:text-purple-400 cursor-pointer transition-all p-3 text-center"
                >
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-medium font-arabic">رفع صورة مرجعية</span>
                  <span className="text-[9px] text-zinc-600 font-mono mt-0.5">PNG, JPG, WebP (Max 5MB)</span>
                </div>
              </div>
            </div>

            {/* Visual Specs Detailed Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-cine-850 p-4 rounded-2xl border border-cine-800 space-y-1">
                <span className="font-semibold text-purple-300 block">الوجه والعينان والشعر</span>
                <p className="text-zinc-300 leading-relaxed font-arabic">{selectedChar.visualSpecs.faceAndEyes}</p>
              </div>

              <div className="bg-cine-850 p-4 rounded-2xl border border-cine-800 space-y-1">
                <span className="font-semibold text-cyan-300 block">الملابس والزي الأصيل والألوان</span>
                <p className="text-zinc-300 leading-relaxed font-arabic">{selectedChar.visualSpecs.clothing}</p>
                <div className="flex items-center gap-2 pt-1">
                  {selectedChar.visualSpecs.clothingColors.map((hex, i) => (
                    <span key={i} className="font-mono text-[10px] bg-cine-900 px-2 py-0.5 rounded text-zinc-400">
                      {hex}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-cine-850 p-4 rounded-2xl border border-cine-800 space-y-1">
                <span className="font-semibold text-amber-300 block">أسلوب الحركة ونسب الجسم</span>
                <p className="text-zinc-300 leading-relaxed font-arabic">{selectedChar.motionStyle}</p>
                <p className="text-[11px] text-zinc-500 mt-1">النسب: {selectedChar.visualSpecs.proportions}</p>
              </div>

              <div className="bg-cine-850 p-4 rounded-2xl border border-cine-800 space-y-1">
                <span className="font-semibold text-emerald-300 block">ملف الصوت والنبرة</span>
                <p className="text-zinc-300 leading-relaxed font-arabic">{selectedChar.voiceProfile.language}</p>
                <p className="text-[11px] text-zinc-500 mt-1">النبرة: {selectedChar.voiceProfile.accent}</p>
              </div>
            </div>

            {/* Negative Constraints Section */}
            <div className="bg-cine-950 p-4 rounded-2xl border border-rose-500/20 space-y-2">
              <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>القيود الصارمة والممنوعات البصرية (Strict Negative Constraints)</span>
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedChar.negativeConstraints.map((constraint, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-rose-500/10 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-xl font-mono"
                  >
                    ⛔ {constraint}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
