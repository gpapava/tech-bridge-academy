"use client";

import { useRef } from "react";

export function WidgetFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);

  // Widgets are same-origin static files, so size the frame to their content.
  const fit = () => {
    const frame = ref.current;
    const doc = frame?.contentDocument;
    if (!frame || !doc) return;
    const resize = () => {
      frame.style.height = `${doc.documentElement.scrollHeight}px`;
    };
    resize();
    new ResizeObserver(resize).observe(doc.body);
  };

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      onLoad={fit}
      scrolling="no"
      className="w-full border-0 min-h-[600px]"
    />
  );
}
