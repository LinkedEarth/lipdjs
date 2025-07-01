import { LiPD } from '../lipd';
import * as path from 'path';
import { parseVariableValues } from '../utils/utils';

/**
 * Regression test: ensure variable.values are available after loading a LiPD file.
 * UI relies on values being present (raw array of numbers / strings).
 */
describe('Variable.values regression', () => {
  const testDataDir = path.join(__dirname, '../../examples/data');

  test('variables contain non-empty values array', async () => {
    const lipd = new LiPD();
    const testFile = path.join(testDataDir, 'Ant-WAIS-Divide.Severinghaus.2012.lpd');

    await lipd.load(testFile);

    const datasets = await lipd.getDatasets();
    expect(datasets.length).toBeGreaterThan(0);

    const ds = datasets[0];
    const paleo = ds.getPaleoData()[0];
    const table = paleo.getMeasurementTables()[0];
    const variable = table.getVariables()[0];

    const rawValues = variable.getValues();
    expect(rawValues).toBeTruthy();

    const valuesArr = parseVariableValues(rawValues as any);
    expect(Array.isArray(valuesArr)).toBe(true);
    expect(valuesArr.length).toBeGreaterThan(0);
  });
}); 