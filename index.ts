export type AspectRatio = "16:9" | "9:16" | "1:1" | "2.39:1";

export type VideoResolution = "720p" | "1080p" | "4K";

export type SceneStatus =
  | "Draft"
  | "Ready"
  | "Queued"
  | "Generating"
  | "Review"
  | "Approved"
  | "Completed"
  | "Failed";

export type MovieGenre =
  | "short-film"
  | "children"
  | "educational"
  | "adventure-comedy"
  | "commercial"
  | "product"
  | "youtube-shorts"
  | "tiktok-reels";

export type DialogueDialect = "fusha" | "omani";

export type EmotionType =
  | "neutral"
  | "happy"
  | "amazed"
  | "angry"
  | "sad"
  | "laughing"
  | "determined"
  | "scared";

export interface Character {
  id: string;
  name: string;
  arabicName: string;
  role: string;
  description: string;
  avatarUrl: string;
  referenceImages: string[];
  visualSpecs: {
    faceAndEyes: string;
    clothing: string;
    clothingColors: string[];
    proportions: string;
    style: "3D Anime" | "Photorealistic" | "Pixar Style" | "Concept Art";
  };
  voiceProfile: {
    language: string;
    pitch: "child" | "robot" | "teen" | "adult";
    accent: string;
    sampleUrl?: string;
  };
  motionStyle: string;
  negativeConstraints: string[];
  locked: boolean;
  createdAt: string;
}

export interface CameraMovement {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  recommendedFor: string;
  dramaticImpact: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  iconName: string;
}

export interface DialogueLine {
  id: string;
  speakerId: string;
  speakerName: string;
  arabicText: string;
  dialect: DialogueDialect;
  emotion: EmotionType;
  startTime: number; // in seconds
  duration: number;  // in seconds
  recommendedDuration: number;
  isOverLimit: boolean;
  lipSyncCues: string[];
  audioUrl?: string;
}

export interface StoryboardScene {
  id: string;
  sceneNumber: number;
  title: string;
  synopsis: string;
  estimatedDuration: number; // in seconds
  shotType: "Extreme Wide" | "Wide" | "Medium" | "Close-Up" | "Extreme Close-Up" | "POV";
  cameraAngle: "Eye Level" | "Low Angle" | "High Angle" | "Dutch Angle" | "Top-Down";
  cameraMovementId: string;
  lighting: string;
  characterIds: string[];
  characterPoses: { [characterId: string]: string };
  dialogueIds: string[];
  soundEffects: string[];
  ambientAudio: string;
  selectedImageUrl?: string;
  imageVariations: string[];
  referenceImageUrl?: string;
  videoUrl?: string;
  status: SceneStatus;
  generationProgress?: number;
  providerId: string;
  costEstimateCredits: number;
  qcPassed?: boolean;
  qcNotes?: string;
}

export interface ScriptBreakdown {
  id: string;
  title: string;
  genre: MovieGenre;
  synopsis: string;
  targetAudience: string;
  totalDurationSeconds: number;
  scenes: StoryboardScene[];
  dialogues: DialogueLine[];
  publishingPlan: {
    platform: "YouTube" | "Shorts" | "TikTok" | "Instagram";
    releaseHook: string;
    cta: string;
  };
}

export type PromptMode = "simple" | "professional" | "advanced";

export interface GeneratedPrompt {
  id: string;
  sceneId: string;
  mode: PromptMode;
  targetProvider: "google-flow" | "veo" | "runway" | "higgsfield" | "universal";
  promptText: string;
  negativePrompt: string;
  cameraPrompt: string;
  lightingPrompt: string;
  dialogueSummary: string;
  estimatedTokens: number;
}

export interface VideoProviderAdapter {
  id: string;
  name: string;
  displayName: string;
  logo: string;
  status: "connected" | "disconnected" | "assisted-mode" | "error";
  supportedRatios: AspectRatio[];
  supportedDurations: number[]; // in seconds e.g. [5, 10]
  costPerSecondCredits: number;
  requiresApiKey: boolean;
  hasOfficialApi: boolean;
  assistedModeGuide?: string;
  models: string[];
}

export interface QualityControlReport {
  sceneId: string;
  checkedAt: string;
  overallScore: number; // 0 - 100
  passed: boolean;
  checks: {
    characterConsistency: { pass: boolean; score: number; comment: string };
    wardrobeAccuracy: { pass: boolean; score: number; comment: string };
    lipSyncAlignment: { pass: boolean; score: number; comment: string };
    extraneousArtifacts: { pass: boolean; score: number; comment: string };
    lightingContinuity: { pass: boolean; score: number; comment: string };
    audioPacing: { pass: boolean; score: number; comment: string };
    durationMatch: { pass: boolean; score: number; comment: string };
  };
  manualChecklist: {
    id: string;
    label: string;
    checked: boolean;
  }[];
}

export interface TimelineTrackClip {
  id: string;
  sceneId?: string;
  title: string;
  trackType: "video" | "voice" | "sfx" | "music";
  startTime: number;
  duration: number;
  sourceUrl: string;
  volume: number; // 0.0 - 1.0
  speed: number;  // 0.5 - 2.0
  transition?: "cut" | "crossfade" | "fade-black" | "wipe";
}

export interface ProductionMemoryRecord {
  id: string;
  title: string;
  category: "approved-prompt" | "character-lock" | "camera-style" | "solution-log";
  characterId?: string;
  sceneType: string;
  inputPrompt: string;
  successfulSettings: Record<string, any>;
  learnedRule: string;
  timestamp: string;
}

export interface YouTubePublishMetadata {
  titleSuggestions: string[];
  selectedTitle: string;
  description: string;
  hashtags: string[];
  tags: string[];
  chapters: { time: string; title: string }[];
  thumbnailConcept: string;
  subtitleVtt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  genre: MovieGenre;
  aspectRatio: AspectRatio;
  resolution: VideoResolution;
  status: "planning" | "in-production" | "review" | "completed";
  coverImage: string;
  directorPrompt: string;
  scenesCount: number;
  completedScenesCount: number;
  totalCreditsUsed: number;
  budgetCreditsLimit: number;
  createdAt: string;
  updatedAt: string;
}
