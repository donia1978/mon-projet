export type EducationDocKind = "exam" | "unit-plan" | "teacher-sheet";

export type ExamRequest = {
  level: string;
  subject: string;
  unit?: string;
  language?: "fr" | "ar";
  format?: "tunisia_official";
  options?: {
    difficulty?: "easy" | "medium" | "hard";
    durationMinutes?: number;
    includeSolutions?: boolean;
  };
};

export type ExamResponse = {
  ok: boolean;
  data?: {
    title: string;
    content: string;
    meta?: Record<string, any>;
  };
  error?: string;
};

const N8N_BASE = (import.meta as any).env?.VITE_N8N_BASE_URL || "http://localhost:5678";

export async function generateExam(
  req: ExamRequest
): Promise<ExamResponse> {
  const r = await fetch(
    endpoint("exam"),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "fr",
        format: "tunisia_official",
        ...req,
      }),
    }
  );

  if (!r.ok) {
    return { ok: false, error: HTTP  };
  }

  return (await r.json()) as ExamResponse;
}


function endpoint(kind: EducationDocKind): string { return ${N8N_BASE}/webhook/donia/education/; }

