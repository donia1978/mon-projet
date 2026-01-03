export type TnCycle = "primaire" | "college" | "lycee";
export type TnLang = "fr" | "ar";

export type TnCurriculumUnit = {
  id: string;
  title: string;
  skills: string[];
  keywords?: string[];
};

export type TnCurriculumSubject = {
  subject: string;
  units: TnCurriculumUnit[];
};

export type TnCurriculumLevel = {
  cycle: TnCycle;
  level: string; // display label
  subjects: TnCurriculumSubject[];
};

export const TN_CURRICULUM_VERSION = "TN-2026.01";

/**
 * Minimal registry scaffold: add units progressively.
 * Important: if a unit is missing, generation should fallback to generic-but-compliant structure.
 */
export const TN_CURRICULUM: TnCurriculumLevel[] = [
  {
    cycle: "primaire",
    level: "6e primaire",
    subjects: [
      {
        subject: "Mathématiques",
        units: [
          { id: "fractions", title: "Fractions", skills: ["Représenter", "Comparer", "Opérer"] },
          { id: "proportionnalite", title: "Proportionnalité", skills: ["Tableaux", "Pourcentages"] },
        ],
      },
      {
        subject: "Français",
        units: [
          { id: "grammaire", title: "Grammaire", skills: ["Accords", "Conjugaison", "Analyse"] },
          { id: "lecture", title: "Lecture", skills: ["Compréhension", "Inférences"] },
        ],
      },
    ],
  },
  {
    cycle: "college",
    level: "9e",
    subjects: [
      {
        subject: "Mathématiques",
        units: [
          { id: "fonctions", title: "Fonctions", skills: ["Lire un graphe", "Calculer", "Interpréter"] },
          { id: "probabilites", title: "Probabilités", skills: ["Événements", "Calculs"] },
        ],
      },
      {
        subject: "Physique",
        units: [
          { id: "electricite", title: "Électricité", skills: ["Circuits", "Lois", "Mesures"] },
        ],
      },
    ],
  },
  {
    cycle: "lycee",
    level: "Bac Math",
    subjects: [
      {
        subject: "Mathématiques",
        units: [
          { id: "analyse", title: "Analyse", skills: ["Limites", "Dérivation", "Intégration"] },
          { id: "algebre", title: "Algèbre", skills: ["Matrices", "Systèmes", "Espaces"] },
        ],
      },
      {
        subject: "Physique",
        units: [
          { id: "mecanique", title: "Mécanique", skills: ["Dynamique", "Énergie", "Mouvement"] },
        ],
      },
    ],
  },
];

export function findLevel(cycle: TnCycle, level: string): TnCurriculumLevel | undefined {
  return TN_CURRICULUM.find(l => l.cycle === cycle && l.level.toLowerCase() === level.toLowerCase());
}

export function findSubject(cycle: TnCycle, level: string, subject: string): TnCurriculumSubject | undefined {
  const lvl = findLevel(cycle, level);
  return lvl?.subjects.find(s => s.subject.toLowerCase() === subject.toLowerCase());
}

export function findUnit(cycle: TnCycle, level: string, subject: string, unitIdOrTitle?: string): TnCurriculumUnit | undefined {
  if (!unitIdOrTitle) return undefined;
  const subj = findSubject(cycle, level, subject);
  const key = unitIdOrTitle.toLowerCase();
  return subj?.units.find(u => u.id.toLowerCase() === key || u.title.toLowerCase() === key);
}
