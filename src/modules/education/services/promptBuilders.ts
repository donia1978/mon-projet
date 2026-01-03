import { TN_CURRICULUM_VERSION, findUnit } from "../curriculum/tn/curriculum.tn";
import type { GenerateExamRequest } from "./n8nEducationClient";

export function buildExamPrompt(req: GenerateExamRequest) {
  const lang = req.language || "fr";
  const total = req.totalPoints ?? 20;
  const duration = req.durationMin ?? (req.cycle === "primaire" ? 60 : req.cycle === "college" ? 90 : 120);

  const unit = findUnit(req.cycle, req.level, req.subject, req.unit);
  const unitBlock = unit
    ? `Unité: ${unit.title}\nCompétences ciblées: ${unit.skills.join(", ")}`
    : `Unité: (non précisée ou non trouvée)\nCompétences: respecter le programme officiel tunisien pour ${req.cycle} (${req.level}) en ${req.subject}.`;

  return [
    `Tu es un générateur d'épreuves scolaires tunisiennes.`,
    `Contraintes STRICTES:`,
    `- Sortie: JSON strict (pas de Markdown)`,
    `- Barème total = ${total}`,
    `- Durée = ${duration} minutes`,
    `- Langue = ${lang}`,
    `- Niveau = ${req.cycle} / ${req.level}`,
    `- Matière = ${req.subject}`,
    `- Version curriculum = ${TN_CURRICULUM_VERSION}`,
    ``,
    unitBlock,
    ``,
    `JSON attendu (clé racine):`,
    `{"meta":{...},"header":{...},"sections":[...],"teacherNotes":[...]}`,
    ``,
    `Si includeSolutions=true, remplir "expected" et "rubric". Sinon, laisser ces champs absents.`,
  ].join("\n");
}
