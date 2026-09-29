import { Evaluation } from '../database/entities';

/** One result per supplier/year/field. Revisions remain in history, never double-counted. */
export function latestEvaluations(evaluations: Evaluation[]) {
  const latest = new Map<string, Evaluation>();
  for (const evaluation of [...evaluations].sort((a,b) => b.createdAt.getTime()-a.createdAt.getTime() || b.id.localeCompare(a.id))) {
    const key = JSON.stringify([evaluation.supplierId, evaluation.period, evaluation.procurementField ?? 'legacy']);
    if (!latest.has(key)) latest.set(key, evaluation);
  }
  return [...latest.values()];
}
