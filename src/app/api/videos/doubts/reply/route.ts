import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { doubtId, lecturerId, reply } = await req.json();
    if (!doubtId || !lecturerId || !reply)
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });

    // Insert reply
    const { error: replyErr } = await supabase.from("doubt_replies").insert([
      {
        doubt_id: doubtId,
        lecturer_id: lecturerId,
        reply_text: reply,
      },
    ]);

    if (replyErr) throw replyErr;

    // Update status
    await supabase.from("doubts").update({ status: "answered" }).eq("id", doubtId);

    return NextResponse.json({ message: "Reply added successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
