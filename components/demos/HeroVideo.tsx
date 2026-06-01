"use client";

import { BrowserMockup } from "@/components/ui/BrowserMockup";

export function HeroVideo() {
  return (
    <BrowserMockup tilt>
      <video
        className="block w-full"
        src="/D8AExplainer.mp4"
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label="D8A.pro explainer video"
      />
    </BrowserMockup>
  );
}
