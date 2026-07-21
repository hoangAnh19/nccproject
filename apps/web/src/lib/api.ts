import { Evaluation, ReportSummary, Supplier } from './types';
import { sampleEvaluations, sampleSummary, sampleSuppliers } from './sample-data';

const configuredServerApiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
const localApiUrls = ['http://localhost:3001', 'http://localhost:13001'];

function getServerApiUrls() {
  return Array.from(new Set([configuredServerApiUrl, ...localApiUrls].filter(Boolean))) as string[];
}

function isNextDynamicServerError(error: unknown) {
  return error instanceof Error && error.message.includes('Dynamic server usage');
}

async function request<T>(path: string, fallback: T): Promise<T> {
  const errors: string[] = [];

  for (const apiUrl of getServerApiUrls()) {
    try {
      const response = await fetch(`${apiUrl}${path}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        errors.push(`${apiUrl}${path} returned ${response.status}`);
        continue;
      }

      return (await response.json()) as T;
    } catch (error) {
      if (isNextDynamicServerError(error)) {
        throw error;
      }

      errors.push(`${apiUrl}${path} failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.error(`API request failed, using sample data for ${path}`, errors);
  return fallback;
}

export function getSuppliers() {
  return request<Supplier[]>('/suppliers', sampleSuppliers);
}

export function getEvaluations() {
  return request<Evaluation[]>('/evaluations', sampleEvaluations);
}

export function getReportSummary() {
  return request<ReportSummary>('/reports/summary', sampleSummary);
}

export function getBrowserApiUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window !== 'undefined' && window.location.port === '13000') {
    return `${window.location.protocol}//${window.location.hostname}:13001`;
  }

  return 'http://localhost:3001';
}
