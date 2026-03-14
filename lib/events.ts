import fs from 'fs/promises';
import path from 'path';

function resolveEventsPath() {
  // Vercel/serverless filesystems are read-only except /tmp.
  if (process.env.VERCEL) {
    return '/tmp/trendforge-events.jsonl';
  }

  return path.join(process.cwd(), 'data', 'events.jsonl');
}

const eventsPath = resolveEventsPath();

export type EventRecord = {
  type: 'lead' | 'click';
  at: string;
  payload: Record<string, unknown>;
};

export async function appendEvent(event: EventRecord) {
  const line = JSON.stringify(event) + '\n';
  await fs.mkdir(path.dirname(eventsPath), { recursive: true });
  await fs.appendFile(eventsPath, line, 'utf8');
}

export async function readEvents(): Promise<EventRecord[]> {
  try {
    const raw = await fs.readFile(eventsPath, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as EventRecord);
  } catch {
    return [];
  }
}
