export type Variant = 'A' | 'B';

export function pickVariant(seed?: string): Variant {
  if (!seed) return Math.random() > 0.5 ? 'A' : 'B';
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash << 5) - hash + seed.charCodeAt(i);
  return Math.abs(hash) % 2 === 0 ? 'A' : 'B';
}
