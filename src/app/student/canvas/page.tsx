"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import MathRenderer from "@/components/ui/MathRenderer";
import "@/styles/ai-canvas.css";

interface CanvasSolutionStep {
  stepNumber: number;
  title: string;
  explanation: string;
  math: string;
}

interface CanvasSolution {
  problemSummary: string;
  subject: string;
  topic: string;
  keyFormulae: string[];
  steps: CanvasSolutionStep[];
  finalAnswer: string;
  boardExamTips: string;
  practiceQuestion: {
    question: string;
    hint: string;
  };
}

interface SavedNote {
  id: string;
  title: string;
  subject: string;
  topic: string;
  created_at: string;
  solution_json: string;
}

const PRESETS = [
  {
    label: "Quadratic Roots",
    prompt: "Find the roots of the quadratic equation: 2x² - 5x + 3 = 0 using the quadratic formula.",
    subject: "Mathematics",
    draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.font = "bold 26px sans-serif";
      ctx.fillStyle = "#1a3a5c";
      ctx.fillText("2x² - 5x + 3 = 0", 60, 100);
      ctx.font = "18px sans-serif";
      ctx.fillStyle = "#495057";
      ctx.fillText("Find roots using formula", 60, 140);
      // Draw formula reminder box
      ctx.strokeStyle = "#c4532a";
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 170, 320, 80);
      ctx.fillStyle = "#c4532a";
      ctx.font = "italic 20px serif";
      ctx.fillText("x = (-b ± √(b² - 4ac)) / 2a", 80, 220);
    },
  },
  {
    label: "Calculus Integral",
    prompt: "Evaluate the indefinite integral: ∫ x · sin(x) dx using integration by parts (ILATE rule).",
    subject: "Mathematics",
    draw: (ctx: CanvasRenderingContext2D) => {
      ctx.font = "bold 28px sans-serif";
      ctx.fillStyle = "#1a3a5c";
      ctx.fillText("∫ x · sin(x) dx", 60, 110);
      ctx.font = "18px sans-serif";
      ctx.fillStyle = "#495057";
      ctx.fillText("Class 12 Integration by Parts", 60, 160);
      ctx.strokeStyle = "#1a7a4a";
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 190, 300, 70);
      ctx.fillStyle = "#1a7a4a";
      ctx.font = "italic 19px serif";
      ctx.fillText("∫ u v dx = u ∫ v dx - ∫ (u' ∫ v dx) dx", 75, 235);
    },
  },
  {
    label: "Optics Snell's Law",
    prompt: "A ray of light enters glass (n2 = 1.5) from air (n1 = 1.0) at an angle of incidence of 30°. Calculate the angle of refraction.",
    subject: "Physics",
    draw: (ctx: CanvasRenderingContext2D) => {
      ctx.font = "bold 22px sans-serif";
      ctx.fillStyle = "#1a3a5c";
      ctx.fillText("Snell's Law: n₁ sin(θ₁) = n₂ sin(θ₂)", 50, 80);
      // Draw interface line
      ctx.strokeStyle = "#adb5bd";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50, 220);
      ctx.lineTo(450, 220);
      ctx.stroke();
      // Normal line
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = "#6c757d";
      ctx.beginPath();
      ctx.moveTo(250, 120);
      ctx.lineTo(250, 320);
      ctx.stroke();
      ctx.setLineDash([]);
      // Incident ray
      ctx.strokeStyle = "#c0392b";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(120, 150);
      ctx.lineTo(250, 220);
      ctx.stroke();
      // Refracted ray
      ctx.strokeStyle = "#2a5a8c";
      ctx.beginPath();
      ctx.moveTo(250, 220);
      ctx.lineTo(330, 310);
      ctx.stroke();
      ctx.fillStyle = "#212529";
      ctx.font = "14px sans-serif";
      ctx.fillText("Air (n₁ = 1.0), θ₁ = 30°", 60, 180);
      ctx.fillText("Glass (n₂ = 1.5), θ₂ = ?", 260, 270);
    },
  },
  {
    label: "Redox Balancing",
    prompt: "Balance the redox chemical equation in acidic medium: MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺.",
    subject: "Chemistry",
    draw: (ctx: CanvasRenderingContext2D) => {
      ctx.font = "bold 24px sans-serif";
      ctx.fillStyle = "#1a3a5c";
      ctx.fillText("MnO₄⁻ + Fe²⁺  →  Mn²⁺ + Fe³⁺", 50, 110);
      ctx.font = "18px sans-serif";
      ctx.fillStyle = "#495057";
      ctx.fillText("Acidic medium (H⁺ / H₂O)", 50, 160);
      ctx.strokeStyle = "#6f42c1";
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 190, 340, 70);
      ctx.fillStyle = "#6f42c1";
      ctx.font = "16px sans-serif";
      ctx.fillText("Balance atoms & oxidation states", 65, 235);
    },
  },
];

export default function AiCanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Whiteboard drawing tools
  const [tool, setTool] = useState<"pen" | "eraser" | "line" | "rect" | "circle">("pen");
  const [color, setColor] = useState("#1a3a5c");
  const [lineWidth, setLineWidth] = useState(3);
  const [grid, setGrid] = useState<"graph" | "lined" | "blank">("graph");
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);

  // History for Undo/Redo
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  // AI query & solution state
  const [promptText, setPromptText] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [isSolving, setIsSolving] = useState(false);
  const [solvingPhase, setSolvingPhase] = useState("");
  const [solution, setSolution] = useState<CanvasSolution | null>(null);
  const [solveError, setSolveError] = useState<string | null>(null);
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Saved Notes Drawer
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(false);

  // Initialize canvas with proper DPI scaling
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      // Fill initial white background so exported images don't have transparency artifacts
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, rect.width, rect.height);
      // Save initial clean state
      try {
        const initialImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setUndoStack([initialImg]);
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, [setupCanvas]);

  // Coordinate helper relative to canvas
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    try {
      const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setUndoStack((prev) => [...prev.slice(-15), state]); // limit to 15 states
      setRedoStack([]);
    } catch {
      // ignore
    }
  };

  // Drawing event handlers
  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(coords);

    try {
      setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    } catch {
      // ignore
    }

    if (tool === "pen" || tool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.lineWidth = tool === "eraser" ? lineWidth * 4 : lineWidth;
    }
  };

  const handleDrawMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCanvasCoords(e);

    if (tool === "pen" || tool === "eraser") {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (snapshot && startPos) {
      // Restore snapshot for live preview of shapes
      ctx.putImageData(snapshot, 0, 0);

      const dpr = window.devicePixelRatio || 1;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      if (tool === "line") {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      } else if (tool === "rect") {
        ctx.strokeRect(startPos.x, startPos.y, coords.x - startPos.x, coords.y - startPos.y);
      } else if (tool === "circle") {
        const radius = Math.hypot(coords.x - startPos.x, coords.y - startPos.y);
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
      ctx.restore();
    }
  };

  const handleEndDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setStartPos(null);
    setSnapshot(null);
    saveCanvasState();
  };

  // Undo / Redo
  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.length <= 1) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const current = undoStack[undoStack.length - 1];
    const previous = undoStack[undoStack.length - 2];

    setRedoStack((prev) => [...prev, current]);
    setUndoStack((prev) => prev.slice(0, -1));

    ctx.putImageData(previous, 0, 0);
  };

  const handleRedo = () => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const next = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, next]);

    ctx.putImageData(next, 0, 0);
  };

  // Clear Canvas
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    saveCanvasState();
  };

  // Load Preset
  const handleLoadPreset = (preset: (typeof PRESETS)[0]) => {
    handleClear();
    setPromptText(preset.prompt);
    setSubject(preset.subject);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.scale(dpr, dpr);
    preset.draw(ctx, canvas.width / dpr, canvas.height / dpr);
    ctx.restore();

    saveCanvasState();
  };

  // Upload Photo / Problem image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const targetWidth = canvas.width / dpr;
        const targetHeight = canvas.height / dpr;

        // Calculate aspect ratio fit
        const scale = Math.min((targetWidth - 40) / img.width, (targetHeight - 40) / img.height, 1);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const posX = (targetWidth - drawW) / 2;
        const posY = (targetHeight - drawH) / 2;

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.drawImage(img, posX, posY, drawW, drawH);
        ctx.restore();

        saveCanvasState();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // AI Solve Action
  const handleSolveWithAi = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsSolving(true);
    setSolveError(null);
    setSaveSuccess(false);

    try {
      setSolvingPhase("Analyzing handwritten math with Gemini Vision...");
      const imageBase64 = canvas.toDataURL("image/png");

      setSolvingPhase("Deciphering equations & applying CBSE/ICSE marking rules...");

      const res = await fetch("/api/ai/canvas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          prompt: promptText,
          subject,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to solve problem.");
      }

      setSolution(data.solution);
      setSolvingPhase("");
    } catch (err: any) {
      console.error("AI Solve error:", err);
      setSolveError(err.message || "Something went wrong while connecting to the AI Mentor.");
    } finally {
      setIsSolving(false);
      setSolvingPhase("");
    }
  };

  // Save Note to Neon PostgreSQL
  const handleSaveToNotes = async () => {
    if (!solution) return;
    setIsSavingNote(true);

    try {
      const res = await fetch("/api/student/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: solution.topic || solution.problemSummary || "Whiteboard Problem",
          subject: solution.subject,
          topic: solution.topic,
          prompt: promptText,
          solution_json: JSON.stringify(solution),
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        alert("Failed to persist note to database.");
      }
    } catch (e: any) {
      alert("Error saving note: " + e.message);
    } finally {
      setIsSavingNote(false);
    }
  };

  // Fetch saved notes from Neon PostgreSQL
  const handleOpenSavedNotes = async () => {
    setShowNotesDrawer(true);
    setLoadingNotes(true);
    try {
      const res = await fetch("/api/student/notes?userId=student_demo");
      const data = await res.json();
      if (data.notes) {
        setSavedNotes(data.notes);
      }
    } catch (e) {
      console.error("Failed to load notes:", e);
    } finally {
      setLoadingNotes(false);
    }
  };

  const handleLoadSavedNote = (note: SavedNote) => {
    try {
      const parsed = JSON.parse(note.solution_json);
      setSolution(parsed);
      setPromptText(note.title);
      setShowNotesDrawer(false);
    } catch (e) {
      console.error("Failed to parse saved note JSON:", e);
    }
  };

  const handleDeleteSavedNote = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this note from PostgreSQL?")) return;

    try {
      const res = await fetch(`/api/student/notes?id=${id}&userId=student_demo`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSavedNotes((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (err) {
      console.error("Delete note error:", err);
    }
  };

  return (
    <div className="canvas-page-wrapper">
      {/* Top Banner Card */}
      <div className="canvas-header-card">
        <div className="canvas-title-group">
          <h1>AI Smart Whiteboard Canvas</h1>
          <p>
            Write, draw or upload mathematical equations, physics diagrams, and science problems.
            Powered by Google Gemini Multimodal Vision &amp; ALIVE Institute academic mentors.
          </p>
        </div>

        <div className="canvas-header-actions">
          <button className="canvas-btn-outline" onClick={handleOpenSavedNotes}>
            My Saved Solutions
          </button>
          <Link href="/student/dashboard" className="canvas-btn-outline">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="canvas-workspace-grid">
        {/* Left: Whiteboard Canvas */}
        <div className="whiteboard-card">
          {/* Whiteboard Toolbar */}
          <div className="whiteboard-toolbar">
            {/* Tool Selection */}
            <div className="tool-group">
              <button
                className={`tool-btn ${tool === "pen" ? "active" : ""}`}
                onClick={() => setTool("pen")}
                title="Pen Tool"
              >
                Pen
              </button>
              <button
                className={`tool-btn ${tool === "eraser" ? "active" : ""}`}
                onClick={() => setTool("eraser")}
                title="Eraser Tool"
              >
                Eraser
              </button>
              <button
                className={`tool-btn ${tool === "line" ? "active" : ""}`}
                onClick={() => setTool("line")}
                title="Straight Line / Vector"
              >
                Line
              </button>
              <button
                className={`tool-btn ${tool === "rect" ? "active" : ""}`}
                onClick={() => setTool("rect")}
                title="Rectangle / Coordinate Box"
              >
                Box
              </button>
              <button
                className={`tool-btn ${tool === "circle" ? "active" : ""}`}
                onClick={() => setTool("circle")}
                title="Circle / Orbit"
              >
                Circle
              </button>
            </div>

            {/* Color Swatches */}
            <div className="color-swatch-list">
              {[
                { hex: "#1a3a5c", name: "ALIVE Navy" },
                { hex: "#212529", name: "Graphite" },
                { hex: "#c0392b", name: "Crimson" },
                { hex: "#1a7a4a", name: "Emerald" },
                { hex: "#6f42c1", name: "Purple" },
                { hex: "#0d6efd", name: "Cobalt" },
              ].map((swatch) => (
                <button
                  key={swatch.hex}
                  className={`color-swatch-btn ${color === swatch.hex ? "active" : ""}`}
                  style={{ backgroundColor: swatch.hex }}
                  onClick={() => {
                    setColor(swatch.hex);
                    if (tool === "eraser") setTool("pen");
                  }}
                  title={swatch.name}
                />
              ))}
            </div>

            {/* Stroke Width */}
            <div className="tool-group">
              {[2, 4, 8].map((w) => (
                <button
                  key={w}
                  className={`tool-btn ${lineWidth === w ? "active" : ""}`}
                  onClick={() => setLineWidth(w)}
                >
                  {w}px
                </button>
              ))}
            </div>

            {/* Grid Pattern Toggle */}
            <div className="tool-group">
              <button
                className={`tool-btn ${grid === "graph" ? "active" : ""}`}
                onClick={() => setGrid("graph")}
                title="Graph Grid"
              >
                # Graph
              </button>
              <button
                className={`tool-btn ${grid === "lined" ? "active" : ""}`}
                onClick={() => setGrid("lined")}
                title="Lined Paper"
              >
                ≡ Lined
              </button>
              <button
                className={`tool-btn ${grid === "blank" ? "active" : ""}`}
                onClick={() => setGrid("blank")}
                title="Blank Whiteboard"
              >
                ◻ Blank
              </button>
            </div>

            {/* Undo / Redo / Clear / Upload */}
            <div className="tool-group">
              <button className="tool-btn" onClick={handleUndo} title="Undo">
                ↩
              </button>
              <button className="tool-btn" onClick={handleRedo} title="Redo">
                ↪
              </button>
              <button className="tool-btn" onClick={handleClear} title="Clear Board">
                Clear
              </button>
              <button
                className="tool-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Upload Homework Photo"
              >
                Upload Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Interactive HTML5 Canvas */}
          <div
            ref={containerRef}
            className={`canvas-interactive-area grid-${grid}`}
          >
            <canvas
              ref={canvasRef}
              className="canvas-element"
              onMouseDown={handleStartDraw}
              onMouseMove={handleDrawMove}
              onMouseUp={handleEndDraw}
              onMouseLeave={handleEndDraw}
              onTouchStart={handleStartDraw}
              onTouchMove={handleDrawMove}
              onTouchEnd={handleEndDraw}
            />
          </div>

          {/* Canvas Bottom Action & Prompt Row */}
          <div className="canvas-action-footer">
            {/* Quick Presets */}
            <div className="presets-section">
              <span className="presets-label">Quick Concept Demos:</span>
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  className="preset-chip"
                  onClick={() => handleLoadPreset(p)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Prompt input and solve button */}
            <div className="canvas-input-row">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  padding: "var(--space-3)",
                  border: "1px solid var(--color-gray-300)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-white)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  color: "var(--color-primary-dark)",
                }}
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="General">General Science</option>
              </select>

              <input
                type="text"
                className="canvas-prompt-input"
                placeholder="Add optional notes (e.g. 'Solve for x using quadratic formula', 'Find velocity at t=4s')..."
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isSolving) handleSolveWithAi();
                }}
              />

              <button
                className="btn-solve-primary"
                onClick={handleSolveWithAi}
                disabled={isSolving}
              >
                {isSolving ? (
                  <>
                    <span className="spinner-inline" /> Solving...
                  </>
                ) : (
                  <>
                    Solve with ALIVE AI
                  </>
                )}
              </button>
            </div>

            {solvingPhase && (
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: 600,
                }}
              >
                <span className="spinner-inline" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
                {solvingPhase}
              </div>
            )}

            {solveError && (
              <div
                style={{
                  padding: "var(--space-2) var(--space-3)",
                  background: "var(--color-error-light)",
                  border: "1px solid var(--color-error)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-error)",
                  fontSize: "var(--text-xs)",
                }}
              >
                {solveError}
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Mentor Solution Panel */}
        <div className="solution-panel-card">
          <div className="solution-panel-header">
            <div className="solution-panel-title">
              ALIVE AI Academic Mentor
            </div>
            {solution && (
              <span className="solution-panel-badge">{solution.subject}</span>
            )}
          </div>

          <div className="solution-panel-content">
            {!solution && !isSolving && (
              <div className="solution-empty-state">
                <h3>Whiteboard Ready</h3>
                <p>
                  Draw your math equation, ray diagram or physics problem on the board on the left,
                  or choose one of the quick concept presets above.
                </p>
                <p style={{ fontSize: "11px", color: "var(--color-gray-400)" }}>
                  Gemini Vision recognizes handwriting and breaks down step-by-step CBSE/ICSE board exam solutions.
                </p>
              </div>
            )}

            {isSolving && !solution && (
              <div className="solution-empty-state">
                <div className="spinner-inline" style={{ width: 32, height: 32, borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
                <h3 style={{ marginTop: "var(--space-4)" }}>Analyzing Board...</h3>
                <p>{solvingPhase || "Connecting to ALIVE AI Mentor engine..."}</p>
              </div>
            )}

            {solution && (
              <>
                {/* Recognized Problem */}
                <div className="problem-summary-banner">
                  <div className="problem-summary-label">Recognized Problem ({solution.topic})</div>
                  <div className="problem-summary-text">{solution.problemSummary}</div>
                </div>

                {/* Key Formulas */}
                {solution.keyFormulae && solution.keyFormulae.length > 0 && (
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-gray-600)", textTransform: "uppercase", marginBottom: 6 }}>
                      Key Formulas Applied:
                    </div>
                    <div className="formula-tag-group">
                      {solution.keyFormulae.map((f, i) => (
                        <div key={i} className="formula-tag">
                          <MathRenderer content={f} inline />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Derivation Steps */}
                <div className="solution-steps-list">
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-gray-600)", textTransform: "uppercase" }}>
                    Step-by-Step Board Derivation:
                  </div>
                  {solution.steps.map((st) => (
                    <div key={st.stepNumber} className="step-card">
                      <div className="step-header">
                        <div className="step-number-badge">{st.stepNumber}</div>
                        <div className="step-title">{st.title}</div>
                      </div>
                      <div className="step-explanation">{st.explanation}</div>
                      {st.math && (
                        <div className="step-math-box">
                          <MathRenderer content={st.math} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Final Answer */}
                <div className="final-answer-card">
                  <div className="final-answer-label">Final Verified Answer</div>
                  <div className="final-answer-math">
                    <MathRenderer content={solution.finalAnswer} />
                  </div>
                </div>

                {/* Board Exam Traps */}
                {solution.boardExamTips && (
                  <div className="board-trap-card">
                    <div className="board-trap-title">
                      Board Exam Trap &amp; Scoring Tip
                    </div>
                    <p className="board-trap-text">{solution.boardExamTips}</p>
                  </div>
                )}

                {/* Practice Challenge */}
                {solution.practiceQuestion && (
                  <div className="practice-challenge-card">
                    <div className="practice-title">Try This Similar Practice Question</div>
                    <div className="practice-question-text">{solution.practiceQuestion.question}</div>
                    {solution.practiceQuestion.hint && (
                      <div className="practice-hint-text">Hint: {solution.practiceQuestion.hint}</div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

            {/* Solution Panel Footer Actions */}
            {solution && (
              <div className="solution-panel-actions">
                <button
                  className="canvas-btn-outline"
                  onClick={handleSaveToNotes}
                  disabled={isSavingNote}
                >
                  {isSavingNote ? "Saving to DB..." : saveSuccess ? "Saved in PostgreSQL!" : "Save to My Notes"}
                </button>

                <button
                  className="canvas-btn-outline"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${solution.topic}\nProblem: ${solution.problemSummary}\nFinal Answer: ${solution.finalAnswer}`
                    );
                    alert("Solution copied to clipboard!");
                  }}
                >
                  Copy Summary
                </button>
              </div>
            )}
        </div>
      </div>

      {/* Saved Notes Modal / Drawer */}
      {showNotesDrawer && (
        <div className="notes-modal-overlay" onClick={() => setShowNotesDrawer(false)}>
          <div className="notes-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="notes-modal-header">
              <h2>Saved Whiteboard Notes (Neon PostgreSQL)</h2>
              <button
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "var(--color-gray-600)",
                }}
                onClick={() => setShowNotesDrawer(false)}
              >
                ✕
              </button>
            </div>

            <div className="notes-modal-body">
              {loadingNotes && (
                <div style={{ textAlign: "center", padding: "var(--space-6)" }}>
                  Loading notes from database...
                </div>
              )}

              {!loadingNotes && savedNotes.length === 0 && (
                <div style={{ textAlign: "center", padding: "var(--space-8)", color: "var(--color-gray-500)" }}>
                  No saved notes yet. Solve a problem on the canvas and click &quot;Save to My Notes&quot;!
                </div>
              )}

              {!loadingNotes &&
                savedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="saved-note-item"
                    onClick={() => handleLoadSavedNote(note)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="saved-note-info">
                      <h4>{note.title}</h4>
                      <div className="saved-note-meta">
                        <span>{note.subject}</span> • <span>{new Date(note.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="tool-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLoadSavedNote(note);
                        }}
                      >
                        Open
                      </button>
                      <button
                        className="tool-btn"
                        style={{ color: "var(--color-error)", fontSize: "var(--text-xs)" }}
                        onClick={(e) => handleDeleteSavedNote(note.id, e)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
