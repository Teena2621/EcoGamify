 import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { studentId, videoId, doubt } = await req.json();
    if (!studentId || !videoId || !doubt)
      return NextResponse.json({ error: "Missing data" }, { status: 400 });

    const { error } = await supabase.from("doubts").insert([
      {
        student_id: studentId,
        video_id: videoId,
        doubt_text: doubt,
        status: "unanswered",
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ message: "Doubt submitted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase.from("doubts").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ doubts: data });
}
