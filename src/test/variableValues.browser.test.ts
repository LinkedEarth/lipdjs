/** @jest-environment jsdom */

import { LiPD } from '../lipd';
import * as fs from 'fs';
import * as path from 'path';
import { parseVariableValues } from '../utils/utils';

// Polyfill atob / btoa for Node <-> browser simulation
if (typeof (global as any).atob === 'undefined') {
  (global as any).atob = (data: string) => Buffer.from(data, 'base64').toString('binary');
}

if (typeof (global as any).btoa === 'undefined') {
  (global as any).btoa = (data: string) => Buffer.from(data, 'binary').toString('base64');
}

// Stub fetch to read local files via the filesystem so _convertBrowser works
(global as any).fetch = async (url: string) => {
  const buffer = fs.readFileSync(url);
  return {
    ok: true,
    status: 200,
    arrayBuffer: async () => buffer,
  } as any;
};

describe('Browser-mode Variable.values', () => {
  const testDataDir = path.join(__dirname, '../../examples/data');

  it('extracts and parses values when running in a browser context', async () => {
    const lipd = new LiPD();
    const testFile = path.join(testDataDir, 'Ant-WAIS-Divide.Severinghaus.2012.lpd');

    await lipd.load(testFile); // triggers _convertBrowser thanks to jsdom window

    const datasets = await lipd.getDatasets();
    expect(datasets.length).toBeGreaterThan(0);

    const ds = datasets[0];
    const variable = ds
      .getPaleoData()[0]
      .getMeasurementTables()[0]
      .getVariables()[0];

    const raw = variable.getValues();
    expect(raw).toBeTruthy();

    const arr = parseVariableValues(raw as any);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBeGreaterThan(0);
  });
}); 