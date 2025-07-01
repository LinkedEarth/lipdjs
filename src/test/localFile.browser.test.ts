/** @jest-environment jsdom */

import { LiPD } from '../lipd';
import * as fs from 'fs';
import * as path from 'path';

// Polyfill for File API in jsdom
class MockFile {
  name: string;
  size: number;
  type: string;
  
  constructor(private buffer: ArrayBuffer, name: string, options: { type?: string } = {}) {
    this.name = name;
    this.size = buffer.byteLength;
    this.type = options.type || '';
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    return this.buffer;
  }
}

// Make MockFile available globally as File
(global as any).File = MockFile;

describe('LiPD.loadFromFile() - Browser File Input', () => {
  const testDataDir = path.join(__dirname, '../../examples/data');

  it('loads a LiPD file from a File object', async () => {
    const lipd = new LiPD();
    const testFilePath = path.join(testDataDir, 'Ant-WAIS-Divide.Severinghaus.2012.lpd');
    
    // Read the file and create a File object
    const fileBuffer = fs.readFileSync(testFilePath);
    const file = new MockFile(fileBuffer, 'Ant-WAIS-Divide.Severinghaus.2012.lpd', { type: 'application/octet-stream' }) as any;

    // Load the file
    await lipd.loadFromFile(file);

    // Verify the data was loaded
    const datasets = await lipd.getDatasets();
    expect(datasets.length).toBeGreaterThan(0);

    const ds = datasets[0];
    expect(ds.getName()).toBeTruthy();
    
    // Verify paleoclimate data is available
    const paleoData = ds.getPaleoData();
    expect(paleoData.length).toBeGreaterThan(0);
    
    // Verify measurement tables are available
    const measurementTables = paleoData[0].getMeasurementTables();
    expect(measurementTables.length).toBeGreaterThan(0);
    
    // Verify variables have data
    const variables = measurementTables[0].getVariables();
    expect(variables.length).toBeGreaterThan(0);
    
    const firstVariable = variables[0];
    expect(firstVariable.getValues()).toBeTruthy();
  });

  it('handles multiple file loads correctly', async () => {
    const lipd = new LiPD();
    const testFiles = [
      'Ant-WAIS-Divide.Severinghaus.2012.lpd',
      'Eur-SpanishPyrenees.Dorado-Linan.2012.lpd'
    ].filter(fileName => fs.existsSync(path.join(testDataDir, fileName)));

    // Load each file separately
    for (const fileName of testFiles) {
      const filePath = path.join(testDataDir, fileName);
      const fileBuffer = fs.readFileSync(filePath);
      const file = new MockFile(fileBuffer, fileName, { type: 'application/octet-stream' }) as any;
      
      await lipd.loadFromFile(file);
    }

    // Verify all datasets were loaded
    const datasets = await lipd.getDatasets();
    expect(datasets.length).toBe(testFiles.length);
  });

  it('throws error when used in non-browser environment', async () => {
    // Mock isNode environment
    const originalWindow = (global as any).window;
    delete (global as any).window;

    const lipd = new LiPD();
    const testFilePath = path.join(testDataDir, 'Ant-WAIS-Divide.Severinghaus.2012.lpd');
    const fileBuffer = fs.readFileSync(testFilePath);
    const file = new MockFile(fileBuffer, 'test.lpd') as any;

    await expect(lipd.loadFromFile(file)).rejects.toThrow('loadFromFile() is only available in browser environments');

    // Restore window
    (global as any).window = originalWindow;
  });
}); 