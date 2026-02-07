 "use client";
import { useEffect, useRef } from "react";
import startPhaserGame from "./startPhaserGame";

export default function PhaserGame() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      startPhaserGame(containerRef.current);
    }
  }, []);

  return <div ref={containerRef} className="w-full h-[600px]" />;
}
