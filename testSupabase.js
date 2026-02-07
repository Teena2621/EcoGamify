 const { createClient } = require("@supabase/supabase-js");

// ⚠️ For testing only, hardcode your Supabase URL & anon key
const supabase = createClient(
  "https://joanqlkkeropklajqpye.supabase.co",  // replace with your Supabase URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYW5xbGtrZXJvcGtsYWpxcHllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MTM1MjEsImV4cCI6MjA3NjE4OTUyMX0.6LrYQ0SP2hvMvx6SSB33YOiP5Q1rdDiF51XQLn9Ewgg"                          // replace with your anon key
);

async function test() {
  const { data: users, error: userError } = await supabase
    .from("users")
    .select("*");
  console.log("Users Data:", users);
  console.log("Users Error:", userError);

  const { data: videos, error: videoError } = await supabase
    .from("videos")
    .select("*");
  console.log("Videos Data:", videos);
  console.log("Videos Error:", videoError);
}

test();
