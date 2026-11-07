"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NewProjectModal from "./NewProjectModal";
import AssistedFlowModal from "./AssistedFlowModal";
import { useCineFlowStore } from "@/lib/store";

export default function StudioShell({ children }: { children: React.ReactNode }) {
  const store = useCineFlowStore();
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isAssistedFlowOpen, setIsAssistedFlowOpen] = useState(false);

  const isAr = store.locale === "ar";
  const activeScene = store.scenes[0];

  return (
    <div dir={isAr ? "rtl" : "ltr"} className={`min-h-screen bg-cine-950 flex font-${isAr ? "arabic" : "sans"}`}>
      {/* Studio Navigation Sidebar */}
      <Sidebar
        locale={store.locale}
        onToggleLocale={store.toggleLocale}
        creditsUsed={store.project.totalCreditsUsed}
        creditsBudget={store.project.budgetCreditsLimit}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          project={store.project}
          locale={store.locale}
          onNewMovieClick={() => setIsNewProjectOpen(true)}
          onOpenAssistedFlow={() => setIsAssistedFlowOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-gradient-to-b from-cine-950 via-cine-900 to-cine-950">
          {children}
        </main>
      </div>

      {/* Modals */}
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onCreate={(newProj) => {
          store.updateProject(newProj);
        }}
      />

      <AssistedFlowModal
        isOpen={isAssistedFlowOpen}
        onClose={() => setIsAssistedFlowOpen(false)}
        scene={activeScene}
        characters={store.characters}
        cameraMovements={store.cameraMovements}
        onSaveVideoUrl={(sceneId, url) => {
          store.updateSceneStatus(sceneId, "Completed");
        }}
      />
    </div>
  );
}
