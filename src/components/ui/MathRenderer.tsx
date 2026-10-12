"use client";

import React, { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

/**
 * Safely renders text containing LaTeX expressions ($...$ or $$...$$) or plain LaTeX code
 */
export function MathRenderer({ content, className = "", inline = false }: MathRendererProps) {
  const renderedHtml = useMemo(() => {
    if (!content) return "";

    // If string is already a pure LaTeX expression without $
    if (inline && !content.includes("$")) {
      try {
        return katex.renderToString(content, { displayMode: false, throwOnError: false });
      } catch {
        return content;
      }
    }

    // Process mixed markdown/text with $...$ and $$...$$
    try {
      // 1. Replace display math $$...$$
      let processed = content.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
        try {
          return `<div class="katex-display-wrapper">${katex.renderToString(math.trim(), {
            displayMode: true,
            throwOnError: false,
          })}</div>`;
        } catch {
          return math;
        }
      });

      // 2. Replace inline math $...$
      processed = processed.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
        try {
          return katex.renderToString(math.trim(), {
            displayMode: false,
            throwOnError: false,
          });
        } catch {
          return math;
        }
      });

      return processed;
    } catch {
      return content;
    }
  }, [content, inline]);

  return (
    <div
      className={`math-rendered-block ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}

export default MathRenderer;
