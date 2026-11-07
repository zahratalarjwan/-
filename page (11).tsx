"use client";

import { useState } from "react";
import {
  Kanban,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Flame,
  ArrowRight,
  Eye,
  Check
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { SceneStatus, StoryboardScene } from "@/types";
import AssistedFlowModal from "@/components/AssistedFlowModal";

export default function ProductionManagerPage() {
  const {
    scenes,
    updateSceneStatus,
    approveScene,
    characters,
    cameraMovements,
    project
  } = useCineFlowStore();

  const [activeFlowScene, setActiveFlowScene] = useState<StoryboardScene | null>(null);
  const [approvingNote, setApprovingNote] = useState("");
  const [selectedSceneForApprove, setSelectedSceneForApprove] = useState<StoryboardScene | null>(null);

  const columns: { status: SceneStatus; label: string; color: string }[] = [
    { status: "Draft", label: "مسودة (Draft)", color: "border-zinc-700 text-zinc-400" },
    { status: "Ready", label: "جاهز للتوليد (Ready)", color: "border-blue-500/50 text-blue-300" },
    { status: "Generating", label: "قيد التوليد (Generating)", color: "border-purple-500/50 text-purple-300" },
    { status: "Review", label: "بانتظار المراجعة (Review)", color: "border-amber-500/50 text-amber-300" },
    { status: "Approved", label: "معتمد ومكتمل (Approved)", color: "border-emerald-500/50 text-emerald-300" }
  ];

  const handleApproveConfirm = () => {
    if (selectedSceneForApprove) {
      approveScene(selectedSceneForApprove.id, approvingNote || "اعتماد مخرج سينمائي");
      setSelectedSceneForApprove(null);
      setApprovingNote("");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Kanban className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">مدير خط الإنتاج السينمائي — AI Video Production Manager</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            إدارة تدفق المشاهد ومتابعة حالة التوليد والاعتماد خطوة بخطوة مع الحماية الصارمة للميزانية وسجل الإصدارات.
          </p>
        </div>

        {/* Budget Status Capsule */}
        <div className="flex items-center gap-3 bg-cine-900 border border-cine-800 px-4 py-2 rounded-2xl text-xs">
          <Flame className="w-4 h-4 text-amber-400" />
          <span className="text-zinc-400">الأرصدة المستهلكة:</span>
          <span className="font-mono text-white font-bold">{project.totalCreditsUsed} / {project.budgetCreditsLimit}</span>
        </div>
      </div>

      {/* Kanban Board Strip */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {columns.map((col) => {
          const colScenes = scenes.filter((s) => {
            if (col.status === "Approved") return s.status === "Approved" || s.status === "Completed";
            if (col.status === "Generating") return s.status === "Generating" || s.status === "Queued";
            return s.status === col.status;
          });

          return (
            <div
              key={col.status}
              className="bg-cine-900/80 border border-cine-800 rounded-2xl p-3 flex flex-col min-h-[550px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-cine-800 pb-2.5 mb-3">
                <span className={`text-xs font-bold ${col.color}`}>{col.label}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cine-850 text-zinc-400">
                  {colScenes.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                {colScenes.map((scene) => (
                  <div
                    key={scene.id}
                    className="bg-cine-850 border border-cine-700/80 rounded-xl p-3 space-y-2.5 shadow-md hover:border-purple-500/50 transition-all text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white truncate">#{scene.sceneNumber} {scene.title}</span>
                      <span className="text-[10px] font-mono text-cyan-300">{scene.estimatedDuration}s</span>
                    </div>

                    {/* Frame image preview */}
                    <div className="aspect-video bg-cine-950 rounded-lg overflow-hidden relative border border-cine-800">
                      {scene.selectedImageUrl ? (
                        <img src={scene.selectedImageUrl} alt={scene.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-[10px]">
                          بانتظار التوليد
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-zinc-400 line-clamp-2 font-arabic">{scene.synopsis}</p>

                    {/* Stage Transitions / Actions */}
                    <div className="pt-2 border-t border-cine-800 flex flex-wrap items-center gap-1.5">
                      {scene.status === "Draft" && (
                        <button
                          onClick={() => updateSceneStatus(scene.id, "Ready")}
                          className="w-full py-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white font-semibold text-[11px] transition-colors"
                        >
                          تجهيز للتوليد ➔
                        </button>
                      )}

                      {scene.status === "Ready" && (
                        <button
                          onClick={() => setActiveFlowScene(scene)}
                          className="w-full py-1.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white font-semibold text-[11px] transition-colors flex items-center justify-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>فتح في Assisted Flow</span>
                        </button>
                      )}

                      {scene.status === "Review" && (
                        <button
                          onClick={() => setSelectedSceneForApprove(scene)}
                          className="w-full py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white font-semibold text-[11px] transition-colors flex items-center justify-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>اعتماد المشهد (Approve)</span>
                        </button>
                      )}

                      {(scene.status === "Approved" || scene.status === "Completed") && (
                        <div className="w-full text-center py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-mono flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>جاهز للمونتاج النهائي</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {colScenes.length === 0 && (
                  <div className="h-32 flex items-center justify-center text-zinc-600 text-[11px] border border-dashed border-cine-800 rounded-xl">
                    لا توجد مشاهد حالياً
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Approval Modal with Learn From Approved Result trigger */}
      {selectedSceneForApprove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-cine-900 border border-cine-700 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>اعتماد المشهد السينمائي والحفظ في ذاكرة الإنتاج</span>
            </div>

            <p className="text-zinc-300 leading-relaxed font-arabic">
              عند اعتمادك للمشهد #{selectedSceneForApprove.sceneNumber}: «{selectedSceneForApprove.title}»، سيقوم النظام تلقائياً بتفعيل خاصية <strong>Learn From Approved Results</strong> وتخزين زوايا الكاميرا والبرومبت المعتمد كمرجع إنتاجي دائم.
            </p>

            <div>
              <label className="block font-semibold text-zinc-200 mb-1">ملاحظات المخرج الفنية للاعتماد (اختياري)</label>
              <textarea
                rows={2}
                value={approvingNote}
                onChange={(e) => setApprovingNote(e.target.value)}
                placeholder="مثال: ثبات ممتاز للدشداشة والكمة العمانية، إضاءة ذهبية متناسقة..."
                className="w-full bg-cine-950 border border-cine-700 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-cine-800">
              <button
                onClick={() => setSelectedSceneForApprove(null)}
                className="px-3 py-1.5 rounded-lg bg-cine-850 hover:bg-cine-800 text-zinc-300"
              >
                إلغاء
              </button>
              <button
                onClick={handleApproveConfirm}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg"
              >
                تأكيد الاعتماد والتعلم
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assisted Flow Modal */}
      <AssistedFlowModal
        isOpen={!!activeFlowScene}
        onClose={() => setActiveFlowScene(null)}
        scene={activeFlowScene || undefined}
        characters={characters}
        cameraMovements={cameraMovements}
        onSaveVideoUrl={(scId, url) => {
          updateSceneStatus(scId, "Review");
        }}
      />
    </div>
  );
}
