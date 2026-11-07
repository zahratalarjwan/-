"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Film,
  Sparkles,
  LayoutGrid,
  Users,
  Mic,
  Video,
  Terminal,
  Kanban,
  CheckCircle2,
  Sliders,
  BrainCircuit,
  Share2,
  Cpu,
  Globe,
  Flame,
  Zap,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface SidebarProps {
  locale: "ar" | "en";
  onToggleLocale: () => void;
  creditsUsed: number;
  creditsBudget: number;
}

export default function Sidebar({ locale, onToggleLocale, creditsUsed, creditsBudget }: SidebarProps) {
  const pathname = usePathname();
  const isAr = locale === "ar";
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Streamlined primary items for high simplicity
  const primaryNavigation = [
    {
      name: isAr ? "الاستوديو البسيط المباشر" : "Quick Studio (Flow)",
      href: "/",
      icon: Zap,
      badge: isAr ? "مباشر" : "Direct",
      highlight: true
    },
    {
      name: isAr ? "المخرج الذكي (AI Director)" : "AI Director",
      href: "/director",
      icon: Sparkles,
      badge: "AI"
    },
    {
      name: isAr ? "الاستوري بورد والمشاهد" : "Storyboard",
      href: "/storyboard",
      icon: LayoutGrid,
      badge: null
    },
    {
      name: isAr ? "تثبيت الشخصيات (عمر ورقية)" : "Characters Lock",
      href: "/characters",
      icon: Users,
      badge: "عمر ورقية"
    },
    {
      name: isAr ? "حسابات Google و Flow" : "Google Flow Accounts",
      href: "/providers",
      icon: Cpu,
      badge: "Google"
    },
    {
      name: isAr ? "استوديو المونتاج والتصدير" : "Video Editor (FFmpeg)",
      href: "/editor",
      icon: Sliders,
      badge: "MP4"
    }
  ];

  // Advanced deep tools grouped neatly
  const advancedNavigation = [
    {
      name: isAr ? "استوديو الحوار العربي" : "Dialogue Studio",
      href: "/dialogue",
      icon: Mic
    },
    {
      name: isAr ? "محرك الكاميرا السينمائية" : "Camera Engine",
      href: "/camera",
      icon: Video
    },
    {
      name: isAr ? "مولد البرومبتات المتقدم" : "Prompt Engine",
      href: "/prompts",
      icon: Terminal
    },
    {
      name: isAr ? "مدير خط الإنتاج (Kanban)" : "Production Manager",
      href: "/production",
      icon: Kanban
    },
    {
      name: isAr ? "تدقيق الجودة (Quality Control)" : "Quality Control",
      href: "/qc",
      icon: CheckCircle2
    },
    {
      name: isAr ? "ذاكرة الإنتاج (Memory Rules)" : "Production Memory",
      href: "/memory",
      icon: BrainCircuit
    },
    {
      name: isAr ? "استوديو النشر واليوتيوب" : "YouTube Studio",
      href: "/publish",
      icon: Share2
    }
  ];

  const creditPercentage = Math.min(100, Math.round((creditsUsed / creditsBudget) * 100));

  return (
    <aside className="w-72 bg-cine-900 border-x border-cine-800 flex flex-col h-screen sticky top-0 select-none z-30">
      {/* Studio Header Brand */}
      <div className="p-5 border-b border-cine-800 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-[2px] shadow-glow-purple group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-cine-950 rounded-[10px] flex items-center justify-center">
              <Film className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-wide text-lg">CineFlow</span>
              <span className="text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">
                FLOW
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-arabic truncate max-w-[150px]">
              {isAr ? "إنتاج فيديو مباشر بالذكاء الاصطناعي" : "Direct AI Filmmaking"}
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
        {/* Primary Streamlined Menu */}
        <div className="space-y-1">
          {primaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  item.highlight && !isActive
                    ? "bg-gradient-to-r from-purple-900/30 to-cyan-900/30 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400"
                    : isActive
                    ? "bg-gradient-to-r from-purple-600/30 to-indigo-600/20 text-white border border-purple-500/40 shadow-glow-purple font-semibold"
                    : "text-zinc-300 hover:text-white hover:bg-cine-850 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      item.highlight ? "text-cyan-400" : isActive ? "text-purple-400" : "text-zinc-400 group-hover:text-zinc-200"
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono shrink-0 ${
                      item.highlight
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : isActive
                        ? "bg-purple-500/30 text-purple-200 border border-purple-400/40"
                        : "bg-cine-800 text-zinc-400 border border-cine-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Advanced Tools Collapsible */}
        <div className="pt-3 border-t border-cine-800/80">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-semibold text-zinc-400 hover:text-white hover:bg-cine-850 transition-colors"
          >
            <span>{isAr ? "الأدوات والمحركات المتقدمة" : "Advanced Engines"}</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdvanced && (
            <div className="mt-1 space-y-1 pl-2 animate-fade-in">
              {advancedNavigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-cine-850 text-purple-300 border border-purple-500/30"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-cine-850/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Google Flow Connected Pill */}
      <div className="px-4 py-3 mx-3 mb-2 rounded-2xl bg-cine-950 border border-cyan-500/20 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white">Google Flow Direct</span>
        </div>
        <p className="text-[11px] text-cyan-300 font-mono mt-0.5 truncate">
          cineflow.studio@gmail.com
        </p>
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-cine-800 flex items-center justify-between bg-cine-950/60">
        <button
          onClick={onToggleLocale}
          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg bg-cine-850 hover:bg-cine-800 border border-cine-700 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isAr ? "English" : "العربية"}</span>
        </button>
        <span className="text-[11px] font-mono text-zinc-500">v1.1 Simple</span>
      </div>
    </aside>
  );
}
