import { neon } from "@neondatabase/serverless";

// Singleton SQL client
let sqlClient: ReturnType<typeof neon> | null = null;
let tablesInitialized = false;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL);
  }
  return sqlClient;
}

// In-memory fallback if database is unreachable or offline
const memoryNotes: Array<{
  id: string;
  user_id: string;
  title: string;
  subject: string;
  topic: string;
  prompt: string;
  solution_json: string;
  created_at: string;
}> = [];

export async function initDbTables(): Promise<boolean> {
  if (tablesInitialized) return true;
  const sql = getDb();
  if (!sql) return false;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS canvas_notes (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        subject TEXT,
        topic TEXT,
        prompt TEXT,
        solution_json TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS enquiries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        course_interest TEXT,
        message TEXT,
        status TEXT DEFAULT 'new',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    tablesInitialized = true;
    return true;
  } catch (error) {
    console.warn("PostgreSQL table init note (continuing with resilient handling):", error);
    return false;
  }
}

export interface CanvasNoteRecord {
  id: string;
  user_id: string;
  title: string;
  subject: string;
  topic: string;
  prompt: string;
  solution_json: string;
  created_at: string;
}

export async function saveCanvasNote(note: Omit<CanvasNoteRecord, "created_at">): Promise<CanvasNoteRecord> {
  const sql = getDb();
  const now = new Date().toISOString();
  const record: CanvasNoteRecord = {
    ...note,
    created_at: now,
  };

  if (sql) {
    try {
      await initDbTables();
      await sql`
        INSERT INTO canvas_notes (id, user_id, title, subject, topic, prompt, solution_json, created_at)
        VALUES (${record.id}, ${record.user_id}, ${record.title}, ${record.subject}, ${record.topic}, ${record.prompt}, ${record.solution_json}, ${record.created_at})
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          solution_json = EXCLUDED.solution_json,
          prompt = EXCLUDED.prompt;
      `;
      return record;
    } catch (err) {
      console.warn("Neon PostgreSQL insert fallback to memory:", err);
    }
  }

  // Memory fallback
  const idx = memoryNotes.findIndex((n) => n.id === record.id);
  if (idx >= 0) {
    memoryNotes[idx] = record;
  } else {
    memoryNotes.unshift(record);
  }
  return record;
}

export async function getCanvasNotes(userId: string = "student_demo"): Promise<CanvasNoteRecord[]> {
  const sql = getDb();
  if (sql) {
    try {
      await initDbTables();
      const rows = (await sql`
        SELECT id, user_id, title, subject, topic, prompt, solution_json, created_at
        FROM canvas_notes
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
        LIMIT 50;
      `) as any[];
      return Array.isArray(rows)
        ? rows.map((r: any) => ({
            id: r.id,
            user_id: r.user_id,
            title: r.title,
            subject: r.subject || "General",
            topic: r.topic || "Practice",
            prompt: r.prompt || "",
            solution_json: r.solution_json,
            created_at: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
          }))
        : [];
    } catch (err) {
      console.warn("Neon PostgreSQL query fallback to memory:", err);
    }
  }

  return memoryNotes.filter((n) => n.user_id === userId);
}

export async function deleteCanvasNote(id: string, userId: string = "student_demo"): Promise<boolean> {
  const sql = getDb();
  if (sql) {
    try {
      await initDbTables();
      await sql`
        DELETE FROM canvas_notes
        WHERE id = ${id} AND user_id = ${userId};
      `;
      return true;
    } catch (err) {
      console.warn("Neon PostgreSQL delete fallback to memory:", err);
    }
  }

  const idx = memoryNotes.findIndex((n) => n.id === id && n.user_id === userId);
  if (idx >= 0) {
    memoryNotes.splice(idx, 1);
    return true;
  }
  return false;
}
