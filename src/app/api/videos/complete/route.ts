import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { studentId, videoId } = await req.json();

    if (!studentId || !videoId)
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });

    // Get video reward points
    const { data: video, error: videoErr } = await supabase
      .from("videos")
      .select("reward_points")
      .eq("id", videoId)
      .single();

    if (videoErr || !video)
      return NextResponse.json({ error: "Video not found" }, { status: 404 });

    const rewardPoints = video.reward_points ?? 10;

    // Update student points
    const { error: updateErr } = await supabase.rpc("increment_points", {
      student_id: studentId,
      points_to_add: rewardPoints,
    });

    if (updateErr) throw updateErr;

    return NextResponse.json({ message: "Points added successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
