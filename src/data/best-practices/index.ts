import type { BestPracticeData } from "./types";
import { ciac } from "./ciac";
import { akmiAlumil } from "./akmi-alumil";
import { epalLamia } from "./epal-lamia";
import { imeGsevee } from "./ime-gsevee";
import { fav } from "./fav";
import { rizzoli } from "./rizzoli";
import { dualAcademy } from "./dual-academy";
import { vetSmeMachinery } from "./vet-sme-machinery";
import { adecat } from "./adecat";
import { imhMachineTool } from "./imh-machine-tool";
import { tkgune } from "./tkgune";

export type { BestPracticeData } from "./types";

export const bestPractices: BestPracticeData[] = [
  ciac,
  akmiAlumil,
  epalLamia,
  imeGsevee,
  fav,
  rizzoli,
  dualAcademy,
  vetSmeMachinery,
  adecat,
  imhMachineTool,
  tkgune,
];

export function getBestPractice(slug: string): BestPracticeData | undefined {
  return bestPractices.find((bp) => bp.slug === slug);
}

export function getBestPracticeSlugs(): string[] {
  return bestPractices.map((bp) => bp.slug);
}
