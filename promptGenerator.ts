import type { StoryboardScene, Character, CameraMovement, PromptMode, GeneratedPrompt } from "../types/index.ts";

export function generateScenePrompt(
  scene: StoryboardScene,
  characters: Character[],
  cameraMove: CameraMovement | undefined,
  mode: PromptMode = "simple",
  targetProvider: "google-flow" | "veo" | "runway" | "higgsfield" | "universal" = "google-flow"
): GeneratedPrompt {
  const involvedChars = characters.filter((c) => scene.characterIds.includes(c.id));

  // Character Locks description
  let charDesc = "";
  let negativeConstraints: string[] = [];

  involvedChars.forEach((c) => {
    negativeConstraints.push(...c.negativeConstraints);
    const pose = scene.characterPoses[c.id] || "natural cinematic expression";

    if (mode === "simple") {
      if (c.id === "char-omar") {
        charDesc += `Omar: cute Omani boy, wearing traditional clean white dishdasha and authentic Omani kammah with fine brown embroidery, big expressive brown eyes, 3D Anime style. Action: ${pose}. `;
      } else if (c.id === "char-ruqayya") {
        charDesc += `Ruqayya: smart Omani girl, wearing modest emerald green hijab completely covering hair, olive green dress with delicate floral embroidery, big kind brown eyes, 3D Anime style. Action: ${pose}. `;
      } else if (c.id === "char-farfoor") {
        charDesc += `Farfoor: friendly hovering spherical white robot, smooth pearl white chassis, glowing blue LED digital eyes, floating smoothly. Action: ${pose}. `;
      } else {
        charDesc += `${c.name}: ${c.visualSpecs.clothing}, ${c.visualSpecs.faceAndEyes}, ${c.visualSpecs.style}. Action: ${pose}. `;
      }
    } else if (mode === "professional") {
      charDesc += `[Character Lock: ${c.name}] ${c.visualSpecs.style} render, ${c.visualSpecs.faceAndEyes}, dressed in ${c.visualSpecs.clothing}. Pose: ${pose}. Motion style: ${c.motionStyle}. `;
    } else {
      // Advanced
      charDesc += `[CHARACTER_CONSISTENCY_TAG: ${c.id}] Name: ${c.name} | Style: ${c.visualSpecs.style} 8K render | Attire: ${c.visualSpecs.clothing} | Palette: ${c.visualSpecs.clothingColors.join(", ")} | Facial Key: ${c.visualSpecs.faceAndEyes} | Dynamics: ${pose} | Pacing: ${c.motionStyle} | `;
    }
  });

  // Camera direction
  const camName = cameraMove ? cameraMove.name : "Static Cinematic";
  const camDesc = cameraMove ? cameraMove.description : "Stable frame";
  let cameraDirection = "";

  if (mode === "simple") {
    cameraDirection = `Camera: ${camName}, ${scene.shotType} shot, ${scene.cameraAngle}.`;
  } else if (mode === "professional") {
    cameraDirection = `Cinematography: ${camName} with intensity ${cameraMove?.intensity || 3}/5, ${scene.shotType} framing at ${scene.cameraAngle}, smooth fluid motion, anamorphic 35mm lens effect.`;
  } else {
    cameraDirection = `--camera-motion="${camName}" --framing="${scene.shotType}" --angle="${scene.cameraAngle}" --speed="${cameraMove?.intensity || 3}" --dof="f/2.4 shallow" --shutter="180-degree"`;
  }

  // Lighting & Atmosphere
  let lightingDirection = scene.lighting;
  if (mode === "professional" || mode === "advanced") {
    lightingDirection += ", volumetric light rays, subsurface scattering, master color grading, filmic contrast";
  }

  // Base prompt assembly
  let mainPrompt = "";
  if (mode === "simple") {
    mainPrompt = `${charDesc} Setting: ${scene.title} - ${scene.synopsis}. ${cameraDirection} Lighting: ${scene.lighting}. High production value, Disney-Pixar 3D Anime animation aesthetics.`;
  } else if (mode === "professional") {
    mainPrompt = `Master Cinematic Scene: "${scene.title}". Narrative context: ${scene.synopsis}. ${charDesc} Environment & Lighting: ${lightingDirection}. ${cameraDirection} Sound mood: ${scene.ambientAudio}. 8K resolution, octane render quality, breathtaking composition.`;
  } else {
    mainPrompt = `PROMPT_START [SCENE_${scene.sceneNumber}] Title: "${scene.title}"\nSYNOPSIS: ${scene.synopsis}\nCHARACTERS: ${charDesc}\nLIGHTING: ${lightingDirection}\nCAMERA_RIG: ${cameraDirection}\nSFX_CUES: ${scene.soundEffects.join(" | ")}\nPOST_FX: temporal consistency enabled, motion blur 0.4, chromatic aberration subtle, 4K HDR --quality=ultra`;
  }

  // Platform specific adapter formatting
  if (targetProvider === "google-flow") {
    mainPrompt = `[Flow Prompt] ${mainPrompt}`;
  } else if (targetProvider === "veo") {
    mainPrompt = `Google Veo Cinematic: ${mainPrompt} --ar 16:9 --style 3d-anime --motion-smoothness 0.85`;
  } else if (targetProvider === "runway") {
    mainPrompt = `${mainPrompt} [Camera: ${camName}] --gen-3-alpha --upscale`;
  } else if (targetProvider === "higgsfield") {
    mainPrompt = `[Higgsfield Director Engine] ${mainPrompt}`;
  }

  const negativePrompt = Array.from(new Set([
    ...negativeConstraints,
    "blurry", "distorted faces", "extra limbs", "bad anatomy", "glitch",
    "deformed eyes", "western suit on Omar", "exposed hair on Ruqayya",
    "watermark", "low resolution", "jitter", "flicker"
  ])).join(", ");

  return {
    id: `prompt-${scene.id}-${Date.now()}`,
    sceneId: scene.id,
    mode,
    targetProvider,
    promptText: mainPrompt.trim(),
    negativePrompt,
    cameraPrompt: cameraDirection,
    lightingPrompt: lightingDirection,
    dialogueSummary: scene.dialogueIds.length > 0 ? `${scene.dialogueIds.length} dialogue lines attached` : "Ambient only",
    estimatedTokens: Math.round(mainPrompt.split(" ").length * 1.3)
  };
}
