import type { Character, CameraMovement, VideoProviderAdapter, Project, StoryboardScene, DialogueLine, ProductionMemoryRecord } from "../types/index.ts";

export const INITIAL_CHARACTERS: Character[] = [
  {
    id: "char-omar",
    name: "Omar",
    arabicName: "عمر",
    role: "البطل الرئيسي - طفل مستكشف",
    description: "طفل عماني شجاع ومحب للاستكشاف والعلوم، يرتدي الدشداشة والكمة العمانية الأصيلة.",
    avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
    referenceImages: [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80"
    ],
    visualSpecs: {
      faceAndEyes: "طفل في التاسعة من عمره، ملامح عربية دافئة، عينان بنيتان واسعتان معبرتان، شعر أسود ناعم",
      clothing: "دشداشة عمانية بيضاء ناصعة مع كمة عمانية بيضاء مطرزة بنقوش بنية تقليدية أنيقة",
      clothingColors: ["#FFFFFF", "#8B4513", "#D2B48C"],
      proportions: "طول طفل طبيعي، مظهر كرتوني سينمائي أنيق",
      style: "3D Anime"
    },
    voiceProfile: {
      language: "العربية (فصحى أو لهجة عمانية محببة)",
      pitch: "child",
      accent: "عمانية لطيفة أو فصحى سينمائية واضحة"
    },
    motionStyle: "حركات رشيقة وفضولية، تعبيرات وجه حية، التفاتات ذكية مفعمة بالحماس",
    negativeConstraints: [
      "no western clothing",
      "no cap or baseball hat",
      "do not remove the Omani Kammah",
      "no adult facial features",
      "maintain clean white dishdasha"
    ],
    locked: true,
    createdAt: "2026-01-10T00:00:00Z"
  },
  {
    id: "char-ruqayya",
    name: "Ruqayya",
    arabicName: "رقية",
    role: "الأخت الصغرى الذكية - العقل المدبر",
    description: "طفلة عمانية ذكية لماحة، ترتدي الحجاب الأخضر وفستانًا تقليديًا أنيقًا.",
    avatarUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&auto=format&fit=crop&q=80",
    referenceImages: [
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=80"
    ],
    visualSpecs: {
      faceAndEyes: "طفلة في الثامنة من عمرها، وجه بريء مشرق، عينان بنيتان كبيرتان مفعمتان بالذكاء والفطنة",
      clothing: "حجاب أخضر زمردي أنيق يغطي الشعر بالكامل، فستان أخضر زيتوني مطرز بزهور ذهبية رقيقة",
      clothingColors: ["#1B4D3E", "#556B2F", "#D4AF37"],
      proportions: "قوام طفلة متناسق، وقفة واثقة ومرحة",
      style: "3D Anime"
    },
    voiceProfile: {
      language: "العربية (فصحى مع نبرة ذكية ومطمئنة)",
      pitch: "child",
      accent: "نطق سليم مخارج واضحة نبرة هادئة ذكية"
    },
    motionStyle: "إيماءات مدروسة، ابتسامات دافئة، تفكير بوضع اليد على الذقن عند حل الألغاز",
    negativeConstraints: [
      "never reveal hair under hijab",
      "no short sleeves",
      "maintain emerald and olive green color palette",
      "keep respectful modest authentic attire"
    ],
    locked: true,
    createdAt: "2026-01-10T00:00:00Z"
  },
  {
    id: "char-farfoor",
    name: "Farfoor",
    arabicName: "فرفور",
    role: "الروبوت الطائر المساعد",
    description: "روبوت طائر صغير الحجم، ذو هيكل كروي ناعم، شاشة وجه تفاعلية معبرة، ومحرك دفع مدمج.",
    avatarUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&auto=format&fit=crop&q=80",
    referenceImages: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80"
    ],
    visualSpecs: {
      faceAndEyes: "شاشة OLED دائرية زرقاء تعكس عيونًا رقمية تعبر عن المشاعر كرموز تعبيرية متحركة",
      clothing: "هيكل معدني أبيض لؤلؤي مع خطوط ضوئية نيون زرقاء سماوية ومحرك تحويم هادئ أسفل الهيكل",
      clothingColors: ["#F8FAFC", "#00F0FF", "#3B82F6"],
      proportions: "جسم كروي قطره 30 سم، أجنحة صغيرة انسيابية",
      style: "3D Anime"
    },
    voiceProfile: {
      language: "العربية مع فلتر إلكتروني لطيف ومؤثرات صوتية رنينية",
      pitch: "robot",
      accent: "نغمات إلكترونية موسيقية مع كلمات واضحة ومرحة"
    },
    motionStyle: "يحوم في الهواء بمرونة، يتمايل مع الإيقاع، يلتف في حلقات بهيجة عند الفرح",
    negativeConstraints: [
      "do not add wheels or walking legs (must float)",
      "do not make appearance scary or military",
      "keep smooth round friendly companion shape"
    ],
    locked: true,
    createdAt: "2026-01-10T00:00:00Z"
  }
];

export const CAMERA_MOVEMENTS: CameraMovement[] = [
  {
    id: "cam-crash-zoom",
    name: "Crash Zoom",
    arabicName: "زوم صادم سريع (Crash Zoom)",
    description: "تقريب سريع ومفاجئ نحو الهدف، يُحدث صدمة بصرية فورية لجذب انتباه المشاهد للحدث الحاسم.",
    recommendedFor: "لحظات الاكتشاف المفاجئ، ردود الأفعال الصادمة، الكوميديا الحركية.",
    dramaticImpact: "إثارة عالية وصدمة درامية فورية تركز على تعابير الوجه.",
    intensity: 5,
    iconName: "Zap"
  },
  {
    id: "cam-dolly-in",
    name: "Dolly In",
    arabicName: "تقدم هادئ (Dolly In)",
    description: "تحرك الكاميرا تدريجيًا إلى الأمام نحو الشخصية، مما يزيد من التركيز الداخلي والشعور بالتعاطف.",
    recommendedFor: "لحظات التفكير العميق، اتخاذ قرار مصيري، بدء سر غامض.",
    dramaticImpact: "تضخيم التوتر النفسي والاقتراب الحميمي من مشاعر الشخصية.",
    intensity: 3,
    iconName: "ArrowUpCircle"
  },
  {
    id: "cam-dolly-out",
    name: "Dolly Out",
    arabicName: "تراجع سينمائي (Dolly Out)",
    description: "ابتعاد الكاميرا تدريجيًا إلى الخلف لكشف المحيط الواسع وعزلة الشخصية في المشهد.",
    recommendedFor: "نهاية المشاهد، كشف حجم التحدي، لحظات الوداع أو التأمل.",
    dramaticImpact: "إحساس بالاتساع، الوحدة، أو استيعاب الصورة الشاملة.",
    intensity: 2,
    iconName: "ArrowDownCircle"
  },
  {
    id: "cam-tracking",
    name: "Tracking Shot",
    arabicName: "ملاحقة جانبية (Tracking Shot)",
    description: "تتحرك الكاميرا بمحاذاة الشخصية جنباً إلى جنب أثناء حركتها عبر البيئة المحيطة.",
    recommendedFor: "المطاردات، المشي والحوار المتبادل، استكشاف بيئة جديدة.",
    dramaticImpact: "إشراك المشاهد وجعله رفيقاً مباشراً في رحلة الأبطال.",
    intensity: 3,
    iconName: "MoveRight"
  },
  {
    id: "cam-orbit",
    name: "Orbit Shot",
    arabicName: "دوران محيطي 360 (Orbit Shot)",
    description: "دوران الكاميرا الدائري حول الشخصية في المركز، مسلطاً الضوء على البيئة بزاوية بانورامية.",
    recommendedFor: "لحظة الانتصار، التنوير، الذهول من عظمة المكان المحيط.",
    dramaticImpact: "شعور بالبطولة والملحمية والاتصال الكلي بالفضاء السينمائي.",
    intensity: 4,
    iconName: "RotateCw"
  },
  {
    id: "cam-dutch-angle",
    name: "Dutch Angle",
    arabicName: "زاوية مائلة (Dutch Angle)",
    description: "إمالة محور الكاميرا الأفقي لإعطاء إحساس بعدم الاستقرار والارتباك النفسي.",
    recommendedFor: "المواقف الخطرة، الشك، وقوع خلل مفاجئ، فوضى الموقف.",
    dramaticImpact: "إرباك المشاهد وتوليد قلق تلقائي من أن شيئاً خاطئاً يوشك أن يحدث.",
    intensity: 4,
    iconName: "Minimize"
  },
  {
    id: "cam-low-angle",
    name: "Low Angle",
    arabicName: "زاوية سفلية تعظيمية (Low Angle)",
    description: "التصوير من مستوى منخفض ناظراً إلى الأعلى نحو الشخصية أو الصرح.",
    recommendedFor: "إبراز القوة، الهيبة، العزيمة، أو ضخامة الآلات والوحوش.",
    dramaticImpact: "يمنح الشخصية حضوراً طاغياً وبطولياً مسيطراً.",
    intensity: 3,
    iconName: "ArrowUp"
  },
  {
    id: "cam-high-angle",
    name: "High Angle",
    arabicName: "زاوية علوية (High Angle)",
    description: "التصوير من زاوية مرتفعة نحو الأسفل تطل على الشخصية.",
    recommendedFor: "إظهار الضعف، الضياع، صغر الحجم، الحيرة أمام المأزق.",
    dramaticImpact: "يجعل الشخصية تبدو ضعيفة أو محاطة بخطر أكبر منها.",
    intensity: 2,
    iconName: "ArrowDown"
  },
  {
    id: "cam-top-down",
    name: "Top-Down / God's Eye",
    arabicName: "عين الطائر / عمودي 90 (Top-Down)",
    description: "كاميرا تنظر رأسياً من السماء بزاوية 90 درجة للأسفل.",
    recommendedFor: "المتاهات، الخرائط، التشكيلات الحركية، الهندسة المعمارية.",
    dramaticImpact: "نظرة شمولية مجردة، تأملية، وتكشف خطط الحركة بوضوح.",
    intensity: 3,
    iconName: "Crosshair"
  },
  {
    id: "cam-crane-shot",
    name: "Crane Shot",
    arabicName: "لقطة الرافعة (Crane Shot)",
    description: "حركة عمودية بانورامية سلسة ترتفع فوق المشهد أو تهبط نحوه بواسطة رافعة.",
    recommendedFor: "الافتتاحيات السينمائية الضخمة والختام الملحمي.",
    dramaticImpact: "فخامة إنتاجية هائلة تنقل المشاهد بين التفاصيل الفردية وعظمة العالم.",
    intensity: 4,
    iconName: "Maximize2"
  },
  {
    id: "cam-push-in",
    name: "Push In",
    arabicName: "دخول مركّز (Push In)",
    description: "حركة سريعة وموجهة نحو أداة أو دليل أو تفصيل صغير دقيق في المشهد.",
    recommendedFor: "إبراز أداة سحرية، شفرة سرية، مفتاح حل اللغز.",
    dramaticImpact: "توجيه انتباه المتفرج القاطع نحو التفصيلة التي ستغير مجرى الأحداث.",
    intensity: 3,
    iconName: "Target"
  },
  {
    id: "cam-pull-back",
    name: "Pull Back",
    arabicName: "سحب استكشافي (Pull Back)",
    description: "البدء بتفصيل صغير جداً ثم الانسحاب للخلف للكشف عن المشهد الحقيقي الصادم.",
    recommendedFor: "المفاجآت الدرامية وكشف التناقض بين الظاهر والحقيقة.",
    dramaticImpact: "قلب توقعات المشاهد وإبهاره بالمفارقة بين الصغير والكبير.",
    intensity: 3,
    iconName: "Minimize2"
  },
  {
    id: "cam-rack-focus",
    name: "Rack Focus",
    arabicName: "تحويل بؤرة التركيز (Rack Focus)",
    description: "تغيير حدة تركيز العدسة من عنصر في المقدمة إلى عنصر آخر في الخلفية.",
    recommendedFor: "ظهور شخصية متسللة في الخلفية، انتباه مفاجئ لشيء خلف البطل.",
    dramaticImpact: "توجيه العين بسلاسة بصرية فائقة وذكاء إخراجي ناضج.",
    intensity: 3,
    iconName: "Eye"
  },
  {
    id: "cam-bullet-time",
    name: "Bullet Time",
    arabicName: "تجميد الزمن الدائري (Bullet Time)",
    description: "إبطاء الحركة شبه التام مع دوران الكاميرا السريع حول الحدث المتجمد.",
    recommendedFor: "اللحظات المفصلية، تفادي المقذوفات، القفزات الإعجازية لفرفور.",
    dramaticImpact: "إبهار بصري فائق يُظهر روعة وتفاصيل اللحظة الفائقة السرعة.",
    intensity: 5,
    iconName: "Clock"
  },
  {
    id: "cam-handheld",
    name: "Handheld Cinematic",
    arabicName: "كاميرا محمولة وثائقية (Handheld)",
    description: "اهتزاز عضوي طبيعي للكاميرا يحاكي يد المصور الواقعية داخل الحدث.",
    recommendedFor: "الهروب في الأزقة، الزلازل، اللحظات التلقائية الميدانية.",
    dramaticImpact: "واقعية شديدة ومصداقية تضع المشاهد في قلب الخطر مباشرة.",
    intensity: 4,
    iconName: "Activity"
  }
];

export const VIDEO_PROVIDERS: VideoProviderAdapter[] = [
  {
    id: "google-flow",
    name: "Google Flow",
    displayName: "Google Flow (Google Labs)",
    logo: "/providers/flow.svg",
    status: "assisted-mode",
    supportedRatios: ["16:9", "9:16", "1:1"],
    supportedDurations: [5, 10],
    costPerSecondCredits: 2,
    requiresApiKey: false,
    hasOfficialApi: false,
    assistedModeGuide: "وضع Assisted Flow Mode المبتكر: يُجهّز لك البرومبت المعتمد، إعدادات الحركة واللقطات بضغطة زر واحدة لفتح المنصة بأمان تام دون تجاوز سياسات Google.",
    models: ["Flow Generation v2", "Flow Cinema Ultra"]
  },
  {
    id: "google-veo",
    name: "Google Veo",
    displayName: "Google Veo (Vertex AI / DeepMind)",
    logo: "/providers/veo.svg",
    status: "disconnected",
    supportedRatios: ["16:9", "9:16"],
    supportedDurations: [5, 8],
    costPerSecondCredits: 5,
    requiresApiKey: true,
    hasOfficialApi: true,
    models: ["Veo-2-Cinematic", "Veo-Preview"]
  },
  {
    id: "runway-gen3",
    name: "Runway Gen-3",
    displayName: "Runway Gen-3 Alpha",
    logo: "/providers/runway.svg",
    status: "disconnected",
    supportedRatios: ["16:9", "9:16"],
    supportedDurations: [5, 10],
    costPerSecondCredits: 4,
    requiresApiKey: true,
    hasOfficialApi: true,
    models: ["Gen-3 Alpha Turbo", "Gen-3 Alpha"]
  },
  {
    id: "higgsfield",
    name: "Higgsfield",
    displayName: "Higgsfield Cinema",
    logo: "/providers/higgsfield.svg",
    status: "disconnected",
    supportedRatios: ["16:9", "9:16", "1:1"],
    supportedDurations: [4, 8],
    costPerSecondCredits: 3,
    requiresApiKey: true,
    hasOfficialApi: true,
    models: ["Higgsfield-Director-v1"]
  },
  {
    id: "kling-ai",
    name: "Kling AI",
    displayName: "Kling AI Video",
    logo: "/providers/kling.svg",
    status: "disconnected",
    supportedRatios: ["16:9", "9:16", "1:1"],
    supportedDurations: [5, 10],
    costPerSecondCredits: 3,
    requiresApiKey: true,
    hasOfficialApi: true,
    models: ["Kling 1.5 Pro", "Kling Standard"]
  }
];

export const INITIAL_PROJECT: Project = {
  id: "proj-oman-oasis",
  title: "سر واحة النجوم المفقودة",
  description: "مغامرة سينمائية ملهمة يخوضها عمر ورقية والروبوت فرفور لاكتشاف سر الطاقة القديمة في أودية عُمان الساحرة.",
  genre: "adventure-comedy",
  aspectRatio: "16:9",
  resolution: "1080p",
  status: "in-production",
  coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
  directorPrompt: "فيلم مغامرات عائلي دافئ بأسلوب 3D Anime يبرز جمال الطبيعة العمانية والذكاء وحب الاستكشاف.",
  scenesCount: 5,
  completedScenesCount: 3,
  totalCreditsUsed: 42,
  budgetCreditsLimit: 150,
  createdAt: "2026-11-01T10:00:00Z",
  updatedAt: "2026-11-07T08:00:00Z"
};

export const INITIAL_SCENES: StoryboardScene[] = [
  {
    id: "scene-1",
    sceneNumber: 1,
    title: "إشارة غامضة في سماء نزوى",
    synopsis: "عمر يقف على سطح برج قلعة نزوى التاريخية عند الغروب، عندما يومض الروبوت فرفور بنبضات زرقاء غير مألوفة تدل على إحداثيات غريبة.",
    estimatedDuration: 6,
    shotType: "Wide",
    cameraAngle: "Eye Level",
    cameraMovementId: "cam-dolly-in",
    lighting: "Golden hour sunset, warm orange sunlight hitting historical sandstones",
    characterIds: ["char-omar", "char-farfoor"],
    characterPoses: {
      "char-omar": "واقفاً متأملاً الأفق، ممسكاً ببوصلة صغيرة، عينان تتسعان بدهشة",
      "char-farfoor": "يحوم بمحاذاة كتف عمر، شاشته الرقمية تومض بعلامات تعجب زرقاء"
    },
    dialogueIds: ["dial-1", "dial-2"],
    soundEffects: ["هبوب نسيم الجبل", "طنين إلكتروني خفيف لرد فعل فرفور"],
    ambientAudio: "أصوات أذان هادئة بعيدة ونداء طيور المساء",
    selectedImageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    imageVariations: [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80"
    ],
    status: "Completed",
    generationProgress: 100,
    providerId: "google-flow",
    costEstimateCredits: 12,
    qcPassed: true,
    qcNotes: "ثبات ممتاز للكمة والدشداشة والعيون البنية. حركة الكاميرا طبيعية للغاية."
  },
  {
    id: "scene-2",
    sceneNumber: 2,
    title: "رقية تفك شفرة الخريطة الحجرية",
    synopsis: "رقية تجلس في فناء بيت أثري، تفرد رقاقة معدنية قديمة بجوار كتب التاريخ، وتكتشف أن الإشارة تشير إلى واحة مخفية خلف جبل شمس.",
    estimatedDuration: 5,
    shotType: "Medium",
    cameraAngle: "Low Angle",
    cameraMovementId: "cam-push-in",
    lighting: "Soft ambient daylight filtered through palm tree leaves",
    characterIds: ["char-ruqayya"],
    characterPoses: {
      "char-ruqayya": "جالسة باعتدال وثقة، تشير بإصبعها نحو نقطة في الخريطة مبتسمة بفطنة"
    },
    dialogueIds: ["dial-3"],
    soundEffects: ["حفيف ورق قديم", "صوت مياه الفلج المنسابة بجوار الفناء"],
    ambientAudio: "خرير الماء وصوت طيور الحديقة",
    selectedImageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80",
    imageVariations: [
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80"
    ],
    status: "Completed",
    generationProgress: 100,
    providerId: "google-flow",
    costEstimateCredits: 10,
    qcPassed: true,
    qcNotes: "الحجاب الأخضر المطرز ثابت بدقة، لا يظهر أي خصلة شعر، والتطريز متناسق."
  },
  {
    id: "scene-3",
    sceneNumber: 3,
    title: "انطلاق فرفور والتحليق نحو الوادي",
    synopsis: "فرفور يطلق محرك النبض الضوئي وينطلق متقدماً أمام عمر ورقية نحو مضيق الوادي الصخري المليء بالمفاجآت.",
    estimatedDuration: 5,
    shotType: "Close-Up",
    cameraAngle: "Dutch Angle",
    cameraMovementId: "cam-bullet-time",
    lighting: "Dramatic rim lighting, glowing blue neon thruster trail",
    characterIds: ["char-farfoor"],
    characterPoses: {
      "char-farfoor": "مندفع بسرعة للأمام، عيناه الرقميتان تتألقان بشكل سهم متحمس"
    },
    dialogueIds: ["dial-4"],
    soundEffects: ["صوت تسارع محرك الدفع المستقبلي", "صدى رياح المضيق الصخري"],
    ambientAudio: "موسيقى ملحمية صاعدة",
    selectedImageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    imageVariations: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80"
    ],
    status: "Completed",
    generationProgress: 100,
    providerId: "google-flow",
    costEstimateCredits: 10,
    qcPassed: true,
    qcNotes: "تجسيد الروبوت الطائر ممتاز، الوهج النيوني دقيق دون أي تشويش."
  },
  {
    id: "scene-4",
    sceneNumber: 4,
    title: "لقاء شجرة اللبان المتوهجة",
    synopsis: "يصل الفريق إلى كهف سري حيث تنمو شجرة لبان بلورية تنبض قطراتها بضوء زمردي ساحر يجيب على تردد فرفور.",
    estimatedDuration: 7,
    shotType: "Wide",
    cameraAngle: "Low Angle",
    cameraMovementId: "cam-orbit",
    lighting: "Mystical bioluminescent glow, cyan and emerald crystal reflections",
    characterIds: ["char-omar", "char-ruqayya", "char-farfoor"],
    characterPoses: {
      "char-omar": "ممدود اليد بذهول واحترام",
      "char-ruqayya": "تنظر بإعجاب وتدوّن في دفترها الصغير",
      "char-farfoor": "يحوم حول التوهج ويتبادل نبضات ضوئية مع الشجرة"
    },
    dialogueIds: ["dial-5", "dial-6"],
    soundEffects: ["رنين بلوري سحري متصاعد", "همهمة طاقة هادئة"],
    ambientAudio: "موسيقى أوركسترالية حالمة",
    selectedImageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    imageVariations: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80"
    ],
    status: "Review",
    generationProgress: 100,
    providerId: "google-flow",
    costEstimateCredits: 14,
    qcPassed: false,
    qcNotes: "المشهد بانتظار الاعتماد النهائي من المخرج، الإضاءة السحرية تبدو واعدة جداً."
  },
  {
    id: "scene-5",
    sceneNumber: 5,
    title: "عهد الحفاظ على السر",
    synopsis: "عمر ورقية وفرفور يتعاهدون على حماية الواحة وعدم العبث بتوازن الطبيعة قبل العودة لبلدتهم بنزوى مع مغيب الشمس.",
    estimatedDuration: 6,
    shotType: "Medium",
    cameraAngle: "Eye Level",
    cameraMovementId: "cam-dolly-out",
    lighting: "Sunset rim light, peaceful dusk twilight with first visible stars",
    characterIds: ["char-omar", "char-ruqayya"],
    characterPoses: {
      "char-omar": "يبتسم برضا واعتزاز",
      "char-ruqayya": "تومي برأسها وتضع يدها على كتف عمر"
    },
    dialogueIds: ["dial-7"],
    soundEffects: ["موسيقى ختامية دافئة", "صوت خطوات على الحصى النظيف"],
    ambientAudio: "سكينة المساء وهواء الجبال النقي",
    selectedImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
    imageVariations: [],
    status: "Draft",
    generationProgress: 0,
    providerId: "google-flow",
    costEstimateCredits: 12
  }
];

export const INITIAL_DIALOGUES: DialogueLine[] = [
  {
    id: "dial-1",
    speakerId: "char-omar",
    speakerName: "عمر",
    arabicText: "انظر يا فرفور، هل ترى ما أراه؟ هذه ليست إشارة راديو عادية!",
    dialect: "fusha",
    emotion: "amazed",
    startTime: 0.5,
    duration: 3.2,
    recommendedDuration: 3.0,
    isOverLimit: false,
    lipSyncCues: ["A_OPEN", "O_ROUND", "CLOSED", "SMILE", "EXCLAMATION"]
  },
  {
    id: "dial-2",
    speakerId: "char-farfoor",
    speakerName: "فرفور",
    arabicText: "بييب بووب! إحداثيات طاقية غير مسبوقة... الخريطة تطلب منا التقدم فوراً!",
    dialect: "fusha",
    emotion: "happy",
    startTime: 3.8,
    duration: 2.1,
    recommendedDuration: 2.2,
    isOverLimit: false,
    lipSyncCues: ["PULSE_FAST", "BLINK_CYAN", "O_ROUND"]
  },
  {
    id: "dial-3",
    speakerId: "char-ruqayya",
    speakerName: "رقية",
    arabicText: "عرفتها! النقوش القديمة تتطابق تماماً مع مسار فلج الخطمين التاريخي.",
    dialect: "fusha",
    emotion: "determined",
    startTime: 0.8,
    duration: 3.4,
    recommendedDuration: 3.5,
    isOverLimit: false,
    lipSyncCues: ["A_OPEN", "WIDE", "CLOSED", "CONFIDENT"]
  },
  {
    id: "dial-4",
    speakerId: "char-farfoor",
    speakerName: "فرفور",
    arabicText: "شغّل محركات النفاث! استعدوا لأجمل رحلة استكشاف في عُمان!",
    dialect: "fusha",
    emotion: "laughing",
    startTime: 0.2,
    duration: 2.8,
    recommendedDuration: 2.8,
    isOverLimit: false,
    lipSyncCues: ["BEAM_PULSE", "ROUND_GLOW"]
  },
  {
    id: "dial-5",
    speakerId: "char-omar",
    speakerName: "عمر",
    arabicText: "سبحان الله، لم أرَ في حياتي شجرة تشع بهذه النضارة والنور الساحر!",
    dialect: "fusha",
    emotion: "amazed",
    startTime: 0.5,
    duration: 3.8,
    recommendedDuration: 4.0,
    isOverLimit: false,
    lipSyncCues: ["A_OPEN", "REVERENCE", "SMILE"]
  },
  {
    id: "dial-6",
    speakerId: "char-ruqayya",
    speakerName: "رقية",
    arabicText: "هذا هو سر لبان أجدادنا القدماء... طاقة نظيفة تحفظ بها الطبيعة نقاءها.",
    dialect: "fusha",
    emotion: "happy",
    startTime: 4.2,
    duration: 3.1,
    recommendedDuration: 3.2,
    isOverLimit: false,
    lipSyncCues: ["SOFT_OPEN", "SMILE"]
  },
  {
    id: "dial-7",
    speakerId: "char-omar",
    speakerName: "عمر",
    arabicText: "سيبقى هذا المكان سراً آمناً بيننا، فالأمانة كنز لا يقدر بثمن.",
    dialect: "fusha",
    emotion: "determined",
    startTime: 0.5,
    duration: 3.5,
    recommendedDuration: 3.5,
    isOverLimit: false,
    lipSyncCues: ["STEADY", "FIRM", "CLOSE"]
  }
];

export const INITIAL_MEMORY: ProductionMemoryRecord[] = [
  {
    id: "mem-1",
    title: "تثبيت كمة وثوب عمر في لقطات الزاوية العريضة",
    category: "character-lock",
    characterId: "char-omar",
    sceneType: "Wide shot outdoor sunny desert oasis",
    inputPrompt: "Omani boy Omar wearing pristine white traditional dishdasha and detailed embroidered Omani kammah with brown motifs, 3D Anime cinematic style, warm lighting",
    successfulSettings: {
      mode: "simple",
      negativePrompt: "western suit, hat, cap, modern shirt, distorted patterns",
      aspectRatio: "16:9"
    },
    learnedRule: "إبقاء البرومبت بسيطاً ومباشراً (وضع Simple) يمنح أفضل ثبات لشكل الكمة العمانية والملامح البريئة لعمر، دون أي تشوه في النقوش.",
    timestamp: "2026-11-02T14:22:00Z"
  },
  {
    id: "mem-2",
    title: "الحجاب الزمردي لرقية وتجنب ظهور خصل الشعر",
    category: "character-lock",
    characterId: "char-ruqayya",
    sceneType: "Medium shot interior historical fort",
    inputPrompt: "Ruqayya Omani girl wearing emerald green modest hijab completely covering hair, olive green dress with subtle golden flower embroidery, intelligent kind brown eyes",
    successfulSettings: {
      mode: "simple",
      negativePrompt: "hair showing, visible braids, short sleeves, transparent hijab"
    },
    learnedRule: "إضافة قيد 'completely covering hair' في صلب الوصف يضمن التزام النموذج بالحجاب الكامل والأصيل بنسبة 100%.",
    timestamp: "2026-11-03T11:10:00Z"
  },
  {
    id: "mem-3",
    title: "تأثير Crash Zoom على التوتر الكوميدي مع فرفور",
    category: "camera-style",
    sceneType: "Comic surprise discovery",
    inputPrompt: "Crash zoom into cute floating white robot Farfoor displaying surprised cyan emoticon eyes, dramatic cinema lighting",
    successfulSettings: {
      intensity: 5,
      cameraSpeed: "ultra-fast",
      holdFrames: 12
    },
    learnedRule: "استخدام زوم سريع مع اهتزازة خفيفة في نهاية الحركة يعطي إحساساً كرتونياً مرحاً ينال إعجاب المشاهدين والأطفال.",
    timestamp: "2026-11-04T16:45:00Z"
  }
];

export const INITIAL_CAMERA_MOVEMENTS = CAMERA_MOVEMENTS;
export const INITIAL_PROVIDERS = VIDEO_PROVIDERS;

