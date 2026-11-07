"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Eye,
  Sliders,
  CheckSquare,
  Square
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { QualityControlReport } from "@/types";

export default function QualityControlPage() {
  const { scenes, characters } = useCineFlowStore();
  const [selectedSceneId, setSelectedSceneId] = useState<string>(scenes[0]?.id || "");
  const [report, setReport] = useState<QualityControlReport | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualChecks, setManualChecks] = useState<{ [id: string]: boolean }>({
    "qc-m-1": true,
    "qc-m-2": true,
    "qc-m-3": true,
    "qc-m-4": true,
    "qc-m-5": true
  });

  const selectedScene = scenes.find((s) => s.id === selectedSceneId) || scenes[0];

  const handleRunScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch("/api/qc/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sceneId: selectedScene.id,
          characterIds: selectedScene.characterIds,
          estimatedDuration: selectedScene.estimatedDuration
        })
      });
      const data = await res.json();
      if (data.success && data.report) {
        setReport(data.report);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  const toggleManualCheck = (id: string) => {
    setManualChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">نظام تدقيق الجودة السينمائية — Video Quality Control (QC)</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            كشف اختلافات الشخصيات والملابس، أخطاء مزامنة الشفاه، العناصر المشوهة، وتغيرات الإضاءة عبر التحليل الآلي وقائمة التدقيق اليدوي.
          </p>
        </div>

        <button
          onClick={handleRunScan}
          disabled={isScanning}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white text-xs font-bold shadow-glow-purple hover:scale-105 active:scale-95 disabled:opacity-50 transition-all self-start md:self-auto"
        >
          {isScanning ? <RefreshCw className="w-4 h-4 animate-spin text-amber-300" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{isScanning ? "جاري الفحص والتحليل..." : "تشغيل التدقيق الآلي (Run QC)"}</span>
        </button>
      </div>

      {/* Scene Selector */}
      <div className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-zinc-300">المشهد المراد تدقيقه:</label>
          <select
            value={selectedScene?.id}
            onChange={(e) => {
              setSelectedSceneId(e.target.value);
              setReport(null);
            }}
            className="bg-cine-950 border border-cine-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-arabic"
          >
            {scenes.map((sc) => (
              <option key={sc.id} value={sc.id}>
                المشهد #{sc.sceneNumber}: {sc.title} ({sc.status})
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs font-mono text-cyan-400">
          الحالة: {selectedScene?.status}
        </span>
      </div>

      {/* Main Grid: Auto QC Metrics (8 Cols) & Manual Checklist (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Analysis Results (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-cine-800 pb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>نتائج الفحص والتحليل البصري الآلي</span>
                </h3>
                <span className="text-[11px] text-zinc-500 font-arabic mt-0.5 block">
                  مقارنة مع قيود تثبيت الشخصيات وقواعد الإخراج المعتمدة
                </span>
              </div>

              {report && (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block font-mono">النتيجة الإجمالية</span>
                    <span className="text-xl font-black text-emerald-400 font-mono">{report.overallScore}%</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                    ✓
                  </div>
                </div>
              )}
            </div>

            {/* If not scanned yet */}
            {!report && !isScanning && (
              <div className="p-8 text-center text-zinc-400 text-xs space-y-3">
                <ShieldCheck className="w-12 h-12 text-zinc-600 mx-auto" />
                <p>اضغط على زر «تشغيل التدقيق الآلي» بالأعلى لفحص المشهد والتأكد من مطابقة الشخصيات ومزامنة الشفاه.</p>
              </div>
            )}

            {/* Automated Metrics List */}
            {report && (
              <div className="space-y-3">
                {Object.entries(report.checks).map(([key, check]) => {
                  const labels: { [k: string]: string } = {
                    characterConsistency: "ثبات وتطابق الشخصيات (Character Consistency)",
                    wardrobeAccuracy: "دقة الأزياء والكمة والحجاب (Wardrobe Accuracy)",
                    lipSyncAlignment: "مزامنة الشفاه مع الحوار العربي (Lip-Sync)",
                    extraneousArtifacts: "خلو الإطارات من العناصر المشوهة (Artifacts)",
                    lightingContinuity: "استمرارية الإضاءة السينمائية (Lighting Continuity)",
                    audioPacing: "توازن الإيقاع الصوتي (Audio Pacing)",
                    durationMatch: "مطابقة زمن المشهد (Duration Match)"
                  };

                  return (
                    <div
                      key={key}
                      className="p-3.5 rounded-2xl bg-cine-850 border border-cine-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-zinc-200">{labels[key] || key}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-cyan-400 font-bold">{check.score}%</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            check.pass ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                          }`}>
                            {check.pass ? "ناجح" : "تنبيه"}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-cine-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                          style={{ width: `${check.score}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-zinc-400 font-arabic pt-1">{check.comment}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Manual Checklist (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="border-b border-cine-800 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                قائمة التدقيق اليدوي للمخرج
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">تحقق بنفسك قبل الاعتماد النهائي</p>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { id: "qc-m-1", label: "عدم ظهور خصل شعر رقية تحت الحجاب الزمردي" },
                { id: "qc-m-2", label: "سلامة نقوش الكمة العمانية البيضاء والبنية لعمر" },
                { id: "qc-m-3", label: "بقاء الروبوت فرفور طائراً مع توهج نفاث أزرق" },
                { id: "qc-m-4", label: "انسيابية حركة الكاميرا دون اهتزاز غير طبيعي" },
                { id: "qc-m-5", label: "عدم وجود نصوص إنجليزية أو علامات مائية عشوائية" }
              ].map((item) => {
                const isChecked = manualChecks[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleManualCheck(item.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                      isChecked
                        ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-200"
                        : "bg-cine-850 border-cine-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div className="mt-0.5">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-zinc-500" />
                      )}
                    </div>
                    <span className="text-xs leading-relaxed font-arabic">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-cine-800 text-center">
              <span className="text-[11px] text-emerald-400 font-medium">
                جاهز للمونتاج والدمج في التايم لاين
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
