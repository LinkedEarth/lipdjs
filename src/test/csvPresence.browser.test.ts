/** @jest-environment jsdom */

import * as fs from 'fs';
import * as path from 'path';
import JSZip from 'jszip';

// Provide a fetch polyfill that returns arrayBuffer of local file
(global as any).fetch = async (url: string) => {
  const buf = fs.readFileSync(url);
  return {
    ok: true,
    status: 200,
    arrayBuffer: async () => buf,
  } as any;
};

describe('Browser – LiPD archive contains CSVs', () => {
  const dataDir = path.join(__dirname, '../../examples/data');
  const lipdFiles = fs.readdirSync(dataDir)
    .filter(f => f.endsWith('.lpd'))
    .map(f => path.join(dataDir, f));

  it.each(lipdFiles)('%s has ≥1 csv entry', async lipdPath => {
    const response = await fetch(lipdPath);
    const buffer = await response.arrayBuffer();
    const zip = await JSZip.loadAsync(buffer);
    const csvCount = Object.values(zip.files).filter(f => !f.dir && f.name.endsWith('.csv')).length;
    expect(csvCount).toBeGreaterThan(0);
  });
}); 