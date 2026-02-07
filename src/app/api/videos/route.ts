 import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";


export async function GET(req: NextRequest) {
  const studentId = req.nextUrl.searchParams.get("userId");
  if (!studentId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  // Get student points
  const { data: student, error: studentError } = await supabase
    .from("users")
    .select("points")
    .eq("id", studentId)
    .single();

  if (studentError || !student) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Get videos student can access
const { data: videos, error: videosError } = await supabase
  .from("videos") // use the correct table name here
  .select("*")
  .lte("required_points", student.points);


  if (videosError) return NextResponse.json({ error: videosError.message }, { status: 500 });

  return NextResponse.json({ videos });
}
