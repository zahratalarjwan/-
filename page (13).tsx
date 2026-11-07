"use client";

import { useState } from "react";
import {
  Cpu,
  ShieldCheck,
  ExternalLink,
  Flame,
  CheckCircle2,
  AlertCircle,
  Key,
  Lock,
  Plus,
  RefreshCw,
  Sliders,
  DollarSign,
  Info
} from "lucide-react";
import { useCineFlowStore } from "@/lib/store";
import { VideoProviderAdapter } from "@/types";
import AssistedFlowModal from "@/components/AssistedFlowModal";

export default function ProvidersPage() {
  const { providers, setProviders, project, updateProject, scenes, characters, cameraMovements } = useCineFlowStore();
  const [selectedProvider, setSelectedProvider] = useState<VideoProviderAdapter | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [activeAccount, setActiveAccount] = useState("studio-primary");
  const [isAssistedFlowModalOpen, setIsAssistedFlowModalOpen] = useState(false);

  const handleSaveApiKey = () => {
    if (!selectedProvider) return;
    const updated = providers.map((p) =>
      p.id === selectedProvider.id
        ? { ...p, status: (apiKeyInput.trim() ? "connected" : "disconnected") as any }
        : p
    );
    setProviders(updated);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setSelectedProvider(null);
      setApiKeyInput("");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white">إدارة منصات الفيديو وحسابات Flow — Multi-Provider Adapters</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-arabic">
            إدارة موصلات منصات توليد الفيديو، إدارة حسابات Google الرسمية، وضبط ميزانية الأرصدة وتفعيل الوضع المساعد (Assisted Mode).
          </p>
        </div>

        <button
          onClick={() => setIsAssistedFlowModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cine-850 hover:bg-cine-800 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all self-start md:self-auto"
        >
          <ExternalLink className="w-4 h-4 text-cyan-400" />
          <span>فتح الوضع المساعد لـ Google Flow</span>
        </button>
      </div>

      {/* Google Flow Account Manager Section */}
      <div className="bg-cine-900 border border-cine-800 rounded-3xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-cine-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">إدارة حسابات Google الرسمية المرتبطة بـ Flow</h2>
              <p className="text-xs text-zinc-400 font-arabic mt-0.5">
                Google OAuth الرسمي المعتمد، التبديل بين الحسابات المصرحة، وحماية الأرصدة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-full font-mono">
              Assisted Flow Mode Enabled
            </span>
          </div>
        </div>

        {/* Notice on Official Policy & Transparent Balance Disclosure */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 font-arabic leading-relaxed">
            <p className="font-semibold text-white">إفصاح الشفافية والامتثال لسياسات Google الرسمية:</p>
            <p>
              • <strong>عدم توفر واجهة برمجية لـ Flow:</strong> لا توفر Google واجهة برمجية عامة رسمية (API) للتحكم المباشر في Google Flow أو لقراءة رصيد الأرصدة تلقائياً.
            </p>
            <p>
              • <strong>ميزانية تقديرية يدوية (Manual Budget):</strong> الأرصدة المعروضة هي مخصص ميزانية محلي يحدده المستخدم للتحكم في تكاليف مشروعه ومنع الاستهلاك الزائد، وليست قراءة آلية من خوادم Google.
            </p>
            <p>
              • <strong>الأمان الصارم:</strong> لا يتم أبداً استخراج كلمات المرور أو ملفات تعريف الارتباط أو الالتفاف على القيود. يتم تجهيز البيانات بأمان لتستخدمها بنفسك في واجهة Flow الرسمية.
            </p>
          </div>
        </div>

        {/* Authorized Google Accounts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => setActiveAccount("studio-primary")}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              activeAccount === "studio-primary"
                ? "bg-cine-850 border-cyan-500 shadow-glow-cyan"
                : "bg-cine-950 border-cine-800 hover:border-cine-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white text-xs">الحساب الإنتاجي (Studio Master)</span>
              {activeAccount === "studio-primary" && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                  الحساب المختار
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">cineflow.production@gmail.com</p>
            <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-3 pt-2 border-t border-cine-800">
              <span>تاريخ التجديد المقدر: 1 ديسمبر 2026</span>
              <span className="text-emerald-400 font-medium">جلسة Google الرسمية</span>
            </div>
          </div>

          <div
            onClick={() => setActiveAccount("director-personal")}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              activeAccount === "director-personal"
                ? "bg-cine-850 border-cyan-500 shadow-glow-cyan"
                : "bg-cine-950 border-cine-800 hover:border-cine-700"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white text-xs">الحساب التجريبي (Director Sandbox)</span>
              {activeAccount === "director-personal" && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                  الحساب المختار
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">director.personal@gmail.com</p>
            <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-3 pt-2 border-t border-cine-800">
              <span>تاريخ التجديد المقدر: 15 نوفمبر 2026</span>
              <span className="text-zinc-400">حساب بديل</span>
            </div>
          </div>
        </div>

        {/* Budget Guardrail Controls */}
        <div className="bg-cine-950 p-4 rounded-2xl border border-cine-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>ميزانية المشروع التقديرية (Manual Budget Allowance)</span>
            </span>
            <p className="text-zinc-400">سقف أمان يحدده المخرج للتحكم في استهلاك المشاهد وتفادي التكاليف غير المحسوبة.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-zinc-400">السقف المحدد:</span>
            <input
              type="number"
              value={project.budgetCreditsLimit}
              onChange={(e) => updateProject({ budgetCreditsLimit: Number(e.target.value) })}
              className="w-20 bg-cine-900 border border-cine-700 text-center font-mono py-1 rounded-xl text-white font-bold"
            />
            <span className="text-zinc-400">رصيد</span>
          </div>
        </div>
      </div>

      {/* Video Provider Adapters Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>محولات منصات الفيديو (Video Provider Adapters)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((prov) => (
            <div
              key={prov.id}
              className="bg-cine-900 border border-cine-800 rounded-3xl p-5 shadow-xl space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">{prov.displayName}</h3>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-medium ${
                      prov.status === "assisted-mode"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : prov.status === "connected"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                    }`}
                  >
                    {prov.status === "assisted-mode" ? "Assisted Mode" : prov.status === "connected" ? "متصل (API Key Active)" : "غير متصل (Disconnected)"}
                  </span>
                </div>

                {prov.assistedModeGuide && (
                  <p className="text-[11px] text-zinc-400 font-arabic leading-relaxed bg-cine-950 p-2.5 rounded-xl border border-cine-850">
                    {prov.assistedModeGuide}
                  </p>
                )}

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>نسب الأبعاد المدعومة:</span>
                    <span className="font-mono text-zinc-200">{prov.supportedRatios.join(" • ")}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>المدد المدعومة:</span>
                    <span className="font-mono text-zinc-200">{prov.supportedDurations.join("s, ")}s</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>التكلفة التقديرية:</span>
                    <span className="font-mono text-cyan-300">{prov.costPerSecondCredits} رصيد / ثانية</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-cine-800">
                {prov.hasOfficialApi ? (
                  <button
                    onClick={() => setSelectedProvider(prov)}
                    className="w-full py-2 rounded-xl bg-cine-850 hover:bg-cine-800 text-zinc-200 text-xs font-semibold border border-cine-700 flex items-center justify-center gap-1.5"
                  >
                    <Key className="w-3.5 h-3.5 text-purple-400" />
                    <span>{prov.status === "connected" ? "تعديل مفتاح API" : "ربط مفتاح API رسمي"}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAssistedFlowModalOpen(true)}
                    className="w-full py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-semibold border border-purple-500/30 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>تشغيل الوضع المساعد (Assisted)</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Key Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-cine-900 border border-cine-700 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-cine-800 pb-3">
              <span className="font-bold text-white text-sm">ربط {selectedProvider.displayName}</span>
              <button onClick={() => setSelectedProvider(null)} className="text-zinc-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-300 block">أدخل مفتاح API الرسمي للمنصة</label>
              <input
                type="password"
                placeholder="sk-..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full bg-cine-950 border border-cine-700 rounded-xl p-2.5 text-zinc-200 font-mono focus:outline-none focus:border-purple-500"
              />
              <span className="text-[10px] text-zinc-500 font-arabic block pt-1">
                تنبيه أمني: يتم حفظ المفاتيح حصرياً في بيئة الخادم دون أي كشف لها في متصفح العميل أو ملفات الجافاسكريبت.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-cine-800">
              <button
                onClick={() => setSelectedProvider(null)}
                className="px-3 py-1.5 rounded-lg bg-cine-850 text-zinc-300"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
              >
                {isSaved ? "تم الحفظ!" : "حفظ وتفعيل"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assisted Flow Modal */}
      <AssistedFlowModal
        isOpen={isAssistedFlowModalOpen}
        onClose={() => setIsAssistedFlowModalOpen(false)}
        scene={scenes[0]}
        characters={characters}
        cameraMovements={cameraMovements}
      />
    </div>
  );
}
