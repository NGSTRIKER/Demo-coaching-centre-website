import { NextRequest, NextResponse } from "next/server";
import { getCanvasNotes, saveCanvasNote, deleteCanvasNote } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "student_demo";
    const notes = await getCanvasNotes(userId);
    return NextResponse.json({ success: true, notes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to load notes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.solution_json) {
      return NextResponse.json({ error: "Missing required note fields." }, { status: 400 });
    }

    const newNote = await saveCanvasNote({
      id: body.id || `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      user_id: body.user_id || "student_demo",
      title: body.title,
      subject: body.subject || "Mathematics",
      topic: body.topic || "Whiteboard Problem",
      prompt: body.prompt || "",
      solution_json: typeof body.solution_json === "string" ? body.solution_json : JSON.stringify(body.solution_json),
    });

    return NextResponse.json({ success: true, note: newNote });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save note" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId") || "student_demo";

    if (!id) {
      return NextResponse.json({ error: "Note ID required" }, { status: 400 });
    }

    const deleted = await deleteCanvasNote(id, userId);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete note" }, { status: 500 });
  }
}
