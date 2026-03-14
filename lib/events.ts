import fs from 'fs/promises';
import path from 'path';

export type EventRecord = {
  type: 'lead' | 'click';
  at: string;
  payload: Record<string, unknown>;
};

type SupabaseEventRow = {
  type: EventRecord['type'];
  at: string;
  payload: Record<string, unknown>;
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_EVENTS_TABLE = process.env.SUPABASE_EVENTS_TABLE || 'events';
const SUPABASE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
const MAX_READ_EVENTS = 5000;

function resolveEventsPath() {
  // Vercel/serverless filesystems are read-only except /tmp.
  if (process.env.VERCEL) {
    return '/tmp/trendforge-events.jsonl';
  }

  return path.join(process.cwd(), 'data', 'events.jsonl');
}

const fileEventsPath = resolveEventsPath();

async function supabaseRequest(pathname: string, init: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(`${SUPABASE_URL}${pathname}`, {
      ...init,
      signal: controller.signal,
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY!}`,
        'Content-Type': 'application/json',
        ...(init.headers || {})
      },
      cache: 'no-store'
    });

    return res;
  } finally {
    clearTimeout(timeout);
  }
}

async function appendFileEvent(event: EventRecord) {
  const line = JSON.stringify(event) + '\n';
  await fs.mkdir(path.dirname(fileEventsPath), { recursive: true });
  await fs.appendFile(fileEventsPath, line, 'utf8');
}

async function readFileEvents(): Promise<EventRecord[]> {
  try {
    const raw = await fs.readFile(fileEventsPath, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as EventRecord);
  } catch {
    return [];
  }
}

async function appendSupabaseEvent(event: EventRecord) {
  const res = await supabaseRequest(`/rest/v1/${SUPABASE_EVENTS_TABLE}`, {
    method: 'POST',
    headers: {
      Prefer: 'return=minimal'
    },
    body: JSON.stringify(event)
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => '');
    throw new Error(`supabase insert failed (${res.status}): ${errorBody}`);
  }
}

async function readSupabaseEvents(): Promise<EventRecord[]> {
  const query = `?select=type,at,payload&order=at.desc&limit=${MAX_READ_EVENTS}`;
  const res = await supabaseRequest(`/rest/v1/${SUPABASE_EVENTS_TABLE}${query}`, {
    method: 'GET'
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => '');
    throw new Error(`supabase read failed (${res.status}): ${errorBody}`);
  }

  const rows = (await res.json()) as SupabaseEventRow[];
  return rows.reverse().map((r) => ({ type: r.type, at: r.at, payload: r.payload }));
}

export async function appendEvent(event: EventRecord) {
  if (SUPABASE_ENABLED) {
    return appendSupabaseEvent(event);
  }

  return appendFileEvent(event);
}

export async function readEvents(): Promise<EventRecord[]> {
  if (SUPABASE_ENABLED) {
    try {
      return await readSupabaseEvents();
    } catch (error) {
      console.error('[events][supabase][read][fallback]', error);
      return readFileEvents();
    }
  }

  return readFileEvents();
}
