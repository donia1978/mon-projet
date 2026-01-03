import type { ExamRequest, UnitPlanRequest, TeacherSheetRequest } from "./types";

export function buildExamPrompt(req: ExamRequest): string {
  return [
    "Tu es un expert en pédagogie tunisienne.",
    "Génère un examen STRICTEMENT conforme aux programmes officiels tunisiens.",
    `Niveau: ${req.level}, Classe: ${req.grade}, Matière: ${req.subject}`,
    `Unité/Chapitre: ${req.unit}`,
    `Durée: ${req.durationMin} min, Format: ${req.format}, Difficulté: ${req.difficulty}`,
    `Langue: ${req.language}`,
    "",
    "Contraintes:",
    "- Barème clair (points par question).",
    "- Questions progressives, sans ambiguïté.",
    "- Fournir corrigé (réponses) + guide enseignant.",
    "- Ne pas inventer des notions hors programme.",
    "",
    "Rends une sortie JSON strictement valide."
  ].join("\n");
}

export function buildUnitPlanPrompt(req: UnitPlanRequest): string {
  return [
    "Tu es un inspecteur pédagogique tunisien.",
    "Crée une planification par unités conforme au programme officiel tunisien.",
    `Niveau: ${req.level}, Classe: ${req.grade}, Matière: ${req.subject}`,
    `Unité: ${req.unit}, Semaines: ${req.weeks}, Séances/sem: ${req.sessionsPerWeek}`,
    `Langue: ${req.language}`,
    "",
    "Rends une sortie JSON strictement valide."
  ].join("\n");
}

export function buildTeacherSheetPrompt(req: TeacherSheetRequest): string {
  return [
    "Tu es un formateur d'enseignants (Tunisie).",
    "Crée une fiche pédagogique complète, opérationnelle en classe.",
    `Niveau: ${req.level}, Classe: ${req.grade}, Matière: ${req.subject}`,
    `Unité: ${req.unit}, Leçon: ${req.lessonTitle}, Durée: ${req.durationMin} min`,
    `Langue: ${req.language}`,
    "",
    "Inclure: objectifs, prérequis, déroulement minuté, différenciation, évaluation.",
    "Rends une sortie JSON strictement valide."
  ].join("\n");
}
