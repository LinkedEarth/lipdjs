import { LiPD } from '../lipd';
import * as path from 'path';
import * as fs from 'fs';
import { Dataset } from '../classes/dataset';

describe('LiPD File Loading Tests', () => {
    const testDataDir = path.join(__dirname, '../../examples/data');
    
    test('should load a single LiPD file', async () => {
        const lipd = new LiPD();
        const testFile = path.join(testDataDir, 'Ant-WAIS-Divide.Severinghaus.2012.lpd');
        
        await lipd.load(testFile);
        
        // Check if the file was loaded successfully
        const datasetNames = await lipd.getAllDatasetNames();
        
        expect(datasetNames.length).toBeGreaterThan(0);
        expect(datasetNames[0]).toContain('Ant-WAIS-Divide');
    });

    test('should load multiple LiPD files', async () => {
        const lipd = new LiPD();
        const testFiles = [
            'Ant-WAIS-Divide.Severinghaus.2012.lpd',
            'MyWonderfulRecord.LinkedEarth.2024.lpd'
        ].map(file => path.join(testDataDir, file));
        
        await lipd.load(testFiles);
        
        const datasetNames = await lipd.getAllDatasetNames();
        expect(datasetNames.length).toBe(2);
        expect(datasetNames).toContain('Ant-WAIS-Divide.Severinghaus.2012');
        expect(datasetNames).toContain('MyWonderfulRecord.LinkedEarth.2024');
    });

    test('should load all LiPD files from directory', async () => {
        const lipd = new LiPD();
        await lipd.loadFromDir(testDataDir);
        
        const datasetNames = await lipd.getAllDatasetNames();
        expect(datasetNames.length).toBeGreaterThan(0);
        
        // Check if all example files are loaded
        const files = fs.readdirSync(testDataDir);
        const lpdFiles = files.filter(file => file.endsWith('.lpd'));
        expect(datasetNames.length).toBe(lpdFiles.length);
    });

    test('should convert LiPD file to Dataset class', async () => {
        const lipd = new LiPD();
        const testFile = path.join(testDataDir, 'Ant-WAIS-Divide.Severinghaus.2012.lpd');
        
        await lipd.load(testFile);
        
        // Get the dataset names and convert the first one to a Dataset class
        const datasetNames = await lipd.getAllDatasetNames();
        expect(datasetNames.length).toBeGreaterThan(0);
        
        // Debug: Print the dataset names
        // console.log('Dataset names:', datasetNames);
        
        const dataset = (await lipd.getDatasets())[0]
        
        // Debug: Print the dataset properties
        // console.log('Dataset name:', dataset.getName());
        // console.log('Dataset ID:', dataset.getDatasetId());
        // console.log('Dataset type:', dataset.constructor.name);
        
        // Verify the Dataset class properties
        expect(dataset).toBeInstanceOf(Dataset);
        expect(dataset.getName()).toBeTruthy();
        expect(dataset.getDatasetId()).toBeTruthy();
        
        // Check if the dataset has the expected structure
        expect(dataset.getPaleoData().length).toBeGreaterThan(0);
        expect(dataset.getChronData()).toBeDefined();
        expect(dataset.getLocation()?.getLatitude()).toBeDefined();
        
        // Verify the dataset name matches
        expect(dataset.getName()).toContain('Ant-WAIS-Divide');
    });

    test('should load datasets into a new LiPD object', async () => {
        const lipd = new LiPD();
        await lipd.loadFromDir(testDataDir);
        
        const datasets = await lipd.getDatasets();
        const lipd2 = new LiPD();
        lipd2.loadDatasets(datasets);

        const datasetNames = await lipd2.getAllDatasetNames();
        expect(datasetNames.length).toBe(datasets.length);

        lipd2.createLipd(datasetNames[0], 'test.lpd');
        
    });
}); 