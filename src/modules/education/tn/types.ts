export type TnLevel = "primaire" | "college" | "lycee";
export type TnSubject = "math" | "physique" | "svt" | "arabe" | "francais" | "anglais" | "histoire" | "geo" | "philo" | "informatique";

export type ExamFormat = "qcm" | "questions" | "mixte";

export type ExamRequest = {
  level: TnLevel;
  grade: string;          // ex: "7e", "9e", "bac"
  subject: TnSubject;
  unit: string;           // unité / chapitre
  durationMin: number;    // ex: 60
  format: ExamFormat;
  difficulty: "facile" | "moyen" | "difficile";
  language: "fr" | "ar";
};

export type ExamOutput = {
  title: string;
  instructions: string[];
  sections: Array<{
    name: string;
    questions: Array<{
      prompt: string;
      choices?: string[];
      answer?: string;
      rubric?: string;
      points?: number;
    }>;
  }>;
  teacherGuide?: {
    competencies: string[];
    commonMistakes: string[];
    correction: string[];
  };
};

export type UnitPlanRequest = {
  level: TnLevel;
  grade: string;
  subject: TnSubject;
  unit: string;
  weeks: number;
  sessionsPerWeek: number;
  language: "fr" | "ar";
};

export type UnitPlanOutput = {
  unit: string;
  goals: string[];
  sessions: Array<{
    week: number;
    session: number;
    title: string;
    objectives: string[];
    activities: string[];
    homework: string[];
    assessment: string[];
  }>;
};

export type TeacherSheetRequest = {
  level: TnLevel;
  grade: string;
  subject: TnSubject;
  unit: string;
  lessonTitle: string;
  durationMin: number;
  language: "fr" | "ar";
};

export type TeacherSheetOutput = {
  title: string;
  prerequisites: string[];
  objectives: string[];
  materials: string[];
  steps: Array<{ timeMin: number; teacher: string; students: string; notes?: string }>;
  differentiation: string[];
  evaluation: string[];
};
