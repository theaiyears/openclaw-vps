import fs from 'fs';
import path from 'path';

const root = process.cwd();
const seedPath = path.join(root, 'content', 'seeds', 'trends.json');
const outPath = path.join(root, 'content', 'generated-topics.md');

const seeds = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

const now = new Date().toISOString();
let output = `# Generated Topic Drafts\n\nGenerated at: ${now}\n\n`;

for (const [idx, s] of seeds.entries()) {
  output += `## ${idx + 1}. ${s.keyword}\n`;
  output += `- Angle: ${s.angle}\n`;
  output += `- CPC Hint: ${s.cpcHint}\n`;
  output += `- Suggested slug: ${s.keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}\n`;
  output += `- Hook: Why \"${s.keyword}\" is surging and how to monetize it this week\n\n`;
}

fs.writeFileSync(outPath, output, 'utf8');
console.log(`Wrote ${outPath}`);
