import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_GOOGLE_ACCOUNT, executeDirectGoogleFlowGeneration } from "@/lib/googleFlow";

export async function GET() {
  return NextResponse.json({
    success: true,
    account: DEFAULT_GOOGLE_ACCOUNT,
    status: "connected",
    mode: "direct-flow-generation",
    features: [
      "توليد مباشر للفيديوهات بضغطة زر واحدة",
      "تثبيت شخصيات عمر ورقية وفرفور تلقائياً",
      "الربط التلقائي بالمشاهد والتايم لاين دون نسخ يدوي",
      "دعم نسب الأبعاد 16:9 و 9:16 و 1:1"
    ]
  });
}

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const {
      accountId = DEFAULT_GOOGLE_ACCOUNT.id,
      sceneTitle = "مشهد سينمائي جديد",
      prompt = "Omar wearing pristine white dishdasha and Omani kammah in historical Nizwa oasis, 3D Anime cinematic",
      characterId = "char-omar",
      aspectRatio = "16:9",
      duration = 5
    } = body;

    const result = await executeDirectGoogleFlowGeneration({
      accountId,
      sceneTitle,
      prompt,
      characterId,
      aspectRatio,
      duration: Number(duration) || 5
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
