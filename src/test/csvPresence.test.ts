import AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';

describe('LiPD archive integrity', () => {
  const testDataDir = path.join(__dirname, '../../examples/data');

  const lipdFiles = fs
    .readdirSync(testDataDir)
    .filter(name => name.endsWith('.lpd'))
    .map(name => path.join(testDataDir, name));

  it.each(lipdFiles)('%s contains at least one CSV', lipdPath => {
    const zip = new AdmZip(lipdPath);
    const csvCount = zip
      .getEntries()
      .filter(e => !e.isDirectory && e.entryName.endsWith('.csv')).length;

    expect(csvCount).toBeGreaterThan(0);
  });
}); 