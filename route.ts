import { NextRequest, NextResponse } from "next/server";
import { StoryboardScene, DialogueLine, ScriptBreakdown } from "@/types";

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const {
      idea = "مغامرة في وادي شاب مع عمر ورقية",
      genre = "adventure-comedy",
      targetAudience = "عائلي وأطفال 7-14 سنة",
      duration = "2-minutes",
      style = "3D Anime"
    } = body;

    if (typeof idea !== "string" || !idea.trim()) {
      return NextResponse.json({ success: false, error: "The 'idea' field must be a non-empty string" }, { status: 400 });
    }

    const cleanIdea = idea.trim().substring(0, 500);

    // AI Director Algorithmic Production Generator
    const generatedTitle = cleanIdea.includes("واحة")
      ? "سر واحة النجوم المفقودة"
      : cleanIdea.includes("قلعة")
      ? "حراس قلعة نزوى الأسطورية"
      : `مغامرة ${cleanIdea.substring(0, 30)}`;

    const scenes: StoryboardScene[] = [
      {
        id: `gen-sc-1-${Date.now()}`,
        sceneNumber: 1,
        title: "الافتتاحية والشرارة الأولى",
        synopsis: `يبدأ المشهد في بيئة مستوحاة من فكرة: "${cleanIdea}"، حيث يلاحظ عمر وفرفور حدثاً غير عادي يثير الفضول.`,
        estimatedDuration: 6,
        shotType: "Wide",
        cameraAngle: "Eye Level",
        cameraMovementId: "cam-dolly-in",
        lighting: "Cinematic golden hour sunlight, sharp depth of field",
        characterIds: ["char-omar", "char-farfoor"],
        characterPoses: {
          "char-omar": "واقفاً متأملاً الأفق، ممسكاً ببوصلة صغيرة وعيناه واسعتان من الدهشة",
          "char-farfoor": "يحوم بمحاذاة كتف عمر، شاشته الرقمية تومض برموز استكشاف"
        },
        dialogueIds: [`gen-dial-1-${Date.now()}`],
        soundEffects: ["هبوب نسيم الجبل", "طنين إلكتروني خفيف لرد فعل فرفور"],
        ambientAudio: "أصوات أودية هادئة وتغريد طيور بعيدة",
        selectedImageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
        imageVariations: [],
        status: "Draft",
        providerId: "google-flow",
        costEstimateCredits: 12
      },
      {
        id: `gen-sc-2-${Date.now()}`,
        sceneNumber: 2,
        title: "رقية تكشف سر اللغز",
        synopsis: "رقية تتدخل بحكمتها وتحلل الرموز المكتشفة، لتصل إلى خطة واضحة ومسار محدد.",
        estimatedDuration: 5,
        shotType: "Medium",
        cameraAngle: "Low Angle",
        cameraMovementId: "cam-push-in",
        lighting: "Soft ambient natural daylight",
        characterIds: ["char-ruqayya"],
        characterPoses: {
          "char-ruqayya": "تشير بذكاء وثقة نحو الدليل المكتشف وتبتسم بفطنة"
        },
        dialogueIds: [`gen-dial-2-${Date.now()}`],
        soundEffects: ["صوت فتح خريطة أثرية", "خرير ماء رقراق"],
        ambientAudio: "أصوات واحة وسكينة طبيعية",
        selectedImageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80",
        imageVariations: [],
        status: "Draft",
        providerId: "google-flow",
        costEstimateCredits: 10
      },
      {
        id: `gen-sc-3-${Date.now()}`,
        sceneNumber: 3,
        title: "ذروة الحركة وانطلاق فرفور",
        synopsis: "انطلاق الروبوت فرفور في مناورة طيران سريعة لتخطي عقبة مفاجئة تمهد الطريق للبقية.",
        estimatedDuration: 5,
        shotType: "Close-Up",
        cameraAngle: "Dutch Angle",
        cameraMovementId: "cam-bullet-time",
        lighting: "Dynamic contrast with cyan thruster glow",
        characterIds: ["char-farfoor"],
        characterPoses: {
          "char-farfoor": "مندفع بسرعة للأمام وعيناه الرقميتان تتألقان بحماس"
        },
        dialogueIds: [`gen-dial-3-${Date.now()}`],
        soundEffects: ["تسارع محرك نفاث ناعم", "صدى رياح"],
        ambientAudio: "موسيقى سينمائية تصاعدية",
        selectedImageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
        imageVariations: [],
        status: "Draft",
        providerId: "google-flow",
        costEstimateCredits: 10
      },
      {
        id: `gen-sc-4-${Date.now()}`,
        sceneNumber: 4,
        title: "النهاية الملهمة والعهد المشترك",
        synopsis: "اجتماع الأصدقاء الثلاثة في لقطة ختامية ساحرة، مع ابتسامات الإنجاز وحكمة ملهمة للأطفال.",
        estimatedDuration: 6,
        shotType: "Wide",
        cameraAngle: "Eye Level",
        cameraMovementId: "cam-dolly-out",
        lighting: "Warm sunset backlight with gentle flare",
        characterIds: ["char-omar", "char-ruqayya", "char-farfoor"],
        characterPoses: {
          "char-omar": "يبتسم برضا واعتزاز ناظراً للكاميرا",
          "char-ruqayya": "تومي برأسها موافقة بحماس",
          "char-farfoor": "يقفز بخفة في الهواء ملوحاً بجناحيه الصغيرين"
        },
        dialogueIds: [`gen-dial-4-${Date.now()}`],
        soundEffects: ["موسيقى أوركسترالية مبهجة", "تصفيق وضحكات خفيفة"],
        ambientAudio: "نسيم المساء الهادئ",
        selectedImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
        imageVariations: [],
        status: "Draft",
        providerId: "google-flow",
        costEstimateCredits: 12
      }
    ];

    const dialogues: DialogueLine[] = [
      {
        id: `gen-dial-1-${Date.now()}`,
        speakerId: "char-omar",
        speakerName: "عمر",
        arabicText: "انظر يا فرفور، هناك شيء غير عادي ينتظرنا خلف تلك التلال!",
        dialect: "fusha",
        emotion: "amazed",
        startTime: 0.5,
        duration: 3.2,
        recommendedDuration: 3.2,
        isOverLimit: false,
        lipSyncCues: ["A_OPEN", "O_ROUND", "WIDE"]
      },
      {
        id: `gen-dial-2-${Date.now()}`,
        speakerId: "char-ruqayya",
        speakerName: "رقية",
        arabicText: "الذكاء والتأمل يحلان أي مسألة، انظر كيف تلتقي خطوط الخريطة!",
        dialect: "fusha",
        emotion: "determined",
        startTime: 0.8,
        duration: 3.4,
        recommendedDuration: 3.5,
        isOverLimit: false,
        lipSyncCues: ["CONFIDENT", "A_OPEN", "SMILE"]
      },
      {
        id: `gen-dial-3-${Date.now()}`,
        speakerId: "char-farfoor",
        speakerName: "فرفور",
        arabicText: "بييب بووب! تم فتح المسار الآمن بنجاح! اتبعوني يا أصدقاء!",
        dialect: "fusha",
        emotion: "happy",
        startTime: 0.2,
        duration: 2.8,
        recommendedDuration: 2.8,
        isOverLimit: false,
        lipSyncCues: ["PULSE_FAST", "ROUND_GLOW"]
      },
      {
        id: `gen-dial-4-${Date.now()}`,
        speakerId: "char-omar",
        speakerName: "عمر",
        arabicText: "رحلة رائعة أخرى تعلمنا فيها أن التعاون سر كل نجاح!",
        dialect: "fusha",
        emotion: "laughing",
        startTime: 0.5,
        duration: 3.5,
        recommendedDuration: 3.5,
        isOverLimit: false,
        lipSyncCues: ["WARM_SMILE", "OPEN", "CLOSE"]
      }
    ];

    const result: ScriptBreakdown = {
      id: `breakdown-${Date.now()}`,
      title: generatedTitle,
      genre: typeof genre === "string" ? genre as any : "adventure-comedy",
      synopsis: `قصة سينمائية ملهمة ومبتكرة تدور حول: ${cleanIdea}. تقدم قيماً إيجابية عن الصداقة والشجاعة وحب الاستكشاف في بيئة بصرية خلابة بأسلوب ${style}.`,
      targetAudience: typeof targetAudience === "string" ? targetAudience : "عائلي",
      totalDurationSeconds: scenes.reduce((acc, s) => acc + s.estimatedDuration, 0),
      scenes,
      dialogues,
      publishingPlan: {
        platform: genre === "youtube-shorts" || genre === "tiktok-reels" ? "Shorts" : "YouTube",
        releaseHook: `هل تخيلتم ماذا وجد عمر ورقية في قلب الجبل؟ شاهد حتى النهاية!`,
        cta: "اشترك في القناة للمزيد من مغامرات عمر ورقية وفرفور السينمائية!"
      }
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
