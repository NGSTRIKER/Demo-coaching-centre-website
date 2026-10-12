import { NextRequest, NextResponse } from "next/server";
import { solveProblemWithGemini, SolveCanvasRequest } from "@/lib/gemini";
import { cacheGet, cacheSet, checkRateLimit } from "@/lib/redis";

export const maxDuration = 30; // 30s timeout

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "student-client";
    const rateLimit = await checkRateLimit(ip, 25, 60);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a moment before sending another canvas query.",
        },
        { status: 429 }
      );
    }

    const body: SolveCanvasRequest = await req.json();

    if (!body.imageBase64 && !body.prompt) {
      return NextResponse.json(
        { error: "Please draw something on the canvas or type a problem description." },
        { status: 400 }
      );
    }

    // Cache key for text-only queries to save Gemini tokens
    const textQueryKey = !body.imageBase64 && body.prompt
      ? `canvas_ai:${encodeURIComponent(body.prompt.trim().toLowerCase())}`
      : null;

    if (textQueryKey) {
      const cached = await cacheGet(textQueryKey);
      if (cached) {
        return NextResponse.json({
          success: true,
          solution: cached,
          cached: true,
        });
      }
    }

    // Call Gemini with multimodal vision & academic system prompt
    const solution = await solveProblemWithGemini(body);

    if (textQueryKey) {
      await cacheSet(textQueryKey, solution, 86400); // 24h cache
    }

    return NextResponse.json({
      success: true,
      solution,
      cached: false,
    });
  } catch (error: any) {
    console.error("AI Canvas route handler error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to analyze problem with AI mentor. Please try again.",
      },
      { status: 500 }
    );
  }
}
