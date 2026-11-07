"use client";

import { useState, useEffect } from "react";
import {
  Project,
  Character,
  StoryboardScene,
  DialogueLine,
  CameraMovement,
  VideoProviderAdapter,
  ProductionMemoryRecord,
  PromptMode,
  SceneStatus
} from "../types";
import {
  INITIAL_CHARACTERS,
  INITIAL_CAMERA_MOVEMENTS,
  INITIAL_PROVIDERS,
  INITIAL_PROJECT,
  INITIAL_SCENES,
  INITIAL_DIALOGUES,
  INITIAL_MEMORY
} from "./initialData";

const STORAGE_KEYS = {
  PROJECT: "cineflow_project",
  CHARACTERS: "cineflow_characters",
  SCENES: "cineflow_scenes",
  DIALOGUES: "cineflow_dialogues",
  MEMORY: "cineflow_memory",
  PROVIDERS: "cineflow_providers",
  LOCALE: "cineflow_locale",
  PROMPT_MODE: "cineflow_prompt_mode"
};

export function useCineFlowStore() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [project, setProject] = useState<Project>(INITIAL_PROJECT);
  const [characters, setCharacters] = useState<Character[]>(INITIAL_CHARACTERS);
  const [scenes, setScenes] = useState<StoryboardScene[]>(INITIAL_SCENES);
  const [dialogues, setDialogues] = useState<DialogueLine[]>(INITIAL_DIALOGUES);
  const [cameraMovements] = useState<CameraMovement[]>(INITIAL_CAMERA_MOVEMENTS);
  const [providers, setProviders] = useState<VideoProviderAdapter[]>(INITIAL_PROVIDERS);
  const [memory, setMemory] = useState<ProductionMemoryRecord[]>(INITIAL_MEMORY);
  const [locale, setLocale] = useState<"ar" | "en">("ar");
  const [promptMode, setPromptMode] = useState<PromptMode>("simple");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProject = localStorage.getItem(STORAGE_KEYS.PROJECT);
      if (storedProject) setProject(JSON.parse(storedProject));

      const storedChars = localStorage.getItem(STORAGE_KEYS.CHARACTERS);
      if (storedChars) setCharacters(JSON.parse(storedChars));

      const storedScenes = localStorage.getItem(STORAGE_KEYS.SCENES);
      if (storedScenes) setScenes(JSON.parse(storedScenes));

      const storedDialogues = localStorage.getItem(STORAGE_KEYS.DIALOGUES);
      if (storedDialogues) setDialogues(JSON.parse(storedDialogues));

      const storedMemory = localStorage.getItem(STORAGE_KEYS.MEMORY);
      if (storedMemory) setMemory(JSON.parse(storedMemory));

      const storedProviders = localStorage.getItem(STORAGE_KEYS.PROVIDERS);
      if (storedProviders) setProviders(JSON.parse(storedProviders));

      const storedLocale = localStorage.getItem(STORAGE_KEYS.LOCALE);
      if (storedLocale === "ar" || storedLocale === "en") setLocale(storedLocale);

      const storedPromptMode = localStorage.getItem(STORAGE_KEYS.PROMPT_MODE);
      if (storedPromptMode) setPromptMode(storedPromptMode as PromptMode);
    } catch (e) {
      console.warn("Storage sync error", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  const updateProject = (updated: Partial<Project>) => {
    setProject((prev) => {
      const next = { ...prev, ...updated, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.PROJECT, JSON.stringify(next));
      return next;
    });
  };

  const updateCharacters = (chars: Character[]) => {
    setCharacters(chars);
    localStorage.setItem(STORAGE_KEYS.CHARACTERS, JSON.stringify(chars));
  };

  const addCharacter = (char: Character) => {
    const updated = [char, ...characters];
    updateCharacters(updated);
  };

  const updateScenes = (newScenes: StoryboardScene[]) => {
    setScenes(newScenes);
    localStorage.setItem(STORAGE_KEYS.SCENES, JSON.stringify(newScenes));
    // update project counts
    const completed = newScenes.filter((s) => s.status === "Completed" || s.status === "Approved").length;
    updateProject({ scenesCount: newScenes.length, completedScenesCount: completed });
  };

  const updateSceneStatus = (sceneId: string, status: SceneStatus) => {
    const next = scenes.map((s) => (s.id === sceneId ? { ...s, status } : s));
    updateScenes(next);
  };

  const approveScene = (sceneId: string, directorNote: string = "") => {
    const target = scenes.find((s) => s.id === sceneId);
    if (!target) return;

    const next = scenes.map((s) => (s.id === sceneId ? { ...s, status: "Approved" as SceneStatus, qcPassed: true, qcNotes: directorNote } : s));
    updateScenes(next);

    // Learn from Approved Result
    const newRecord: ProductionMemoryRecord = {
      id: `mem-${Date.now()}`,
      title: `اعتماد المشهد رقم ${target.sceneNumber}: ${target.title}`,
      category: "approved-prompt",
      sceneType: target.shotType,
      inputPrompt: target.synopsis,
      successfulSettings: {
        cameraAngle: target.cameraAngle,
        cameraMovementId: target.cameraMovementId,
        lighting: target.lighting,
        directorNote
      },
      learnedRule: `تم اعتماد زاوية (${target.cameraAngle}) وحركة (${target.cameraMovementId}) وإضاءة (${target.lighting}) بنجاح وتميز درامي عالي.`,
      timestamp: new Date().toISOString()
    };

    const updatedMemory = [newRecord, ...memory];
    setMemory(updatedMemory);
    localStorage.setItem(STORAGE_KEYS.MEMORY, JSON.stringify(updatedMemory));
  };

  const updateDialogues = (newDialogues: DialogueLine[]) => {
    setDialogues(newDialogues);
    localStorage.setItem(STORAGE_KEYS.DIALOGUES, JSON.stringify(newDialogues));
  };

  const toggleLocale = () => {
    const next = locale === "ar" ? "en" : "ar";
    setLocale(next);
    localStorage.setItem(STORAGE_KEYS.LOCALE, next);
  };

  const changePromptMode = (mode: PromptMode) => {
    setPromptMode(mode);
    localStorage.setItem(STORAGE_KEYS.PROMPT_MODE, mode);
  };

  return {
    isLoaded,
    project,
    updateProject,
    characters,
    updateCharacters,
    addCharacter,
    scenes,
    updateScenes,
    updateSceneStatus,
    approveScene,
    dialogues,
    updateDialogues,
    cameraMovements,
    providers,
    setProviders,
    memory,
    locale,
    toggleLocale,
    promptMode,
    changePromptMode
  };
}
