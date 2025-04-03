import { LiPD } from './lipd';
import * as path from 'path';
import { Dataset } from './classes/dataset';

const testDataDir = path.join(__dirname, '../examples/data');
const testFile = path.join(testDataDir, 'Ant-WAIS-Divide.Severinghaus.2012.lpd');

  // Create a new LiPD instance for serialization
  const lipd = new LiPD();
  lipd.load(testFile).then(() => {
    lipd.serialize("n3").then(n3 => {
        // console.log('N3:', n3);

        lipd.getAllDatasetNames().then(datasetNames => {
            const datasetJson = lipd.getLipd(datasetNames[0]);
            // Debug: Print the raw JSON
            // console.log('Dataset JSON:', JSON.stringify(datasetJson, null, 2));

            const dataset = Dataset.fromJson(datasetJson);

            // Debug: Print the dataset properties
            console.log('Dataset name:', dataset.getName());
            console.log('Dataset ID:', dataset.getDatasetId());
            console.log('Dataset type:', dataset.constructor.name);
            for(const pd of dataset.getPaleoData()) {
                for(const table of pd.getMeasurementTables()) {
                    console.log('MeasurementTable:', table.getFileName());
                    console.log("Data:", table.getDataFrame());
                    for(const v of table.getVariables()) {
                        console.log('Variable:', v.getName());
                        console.log('Variable type:', v.getType());
                        console.log('Variable column number:', v.getColumnNumber());
                        console.log('Variable description:', v.getDescription());
                        for(const interp of v.getInterpretations()) {
                            console.log('Interpretation:', interp.toJson());
                            console.log('Interpretation basis:', interp.getBasis());
                            console.log('Interpretation direction:', interp.getDirection());
                            console.log('Interpretation seasonality:', interp.getSeasonality());
                            console.log('Interpretation variable:', interp.getVariable());
                        }
                        const res = v.getResolution()
                        if(res) {
                            console.log('Resolution:', res.toJson());
                        }
                        
                    }
                }
            }
        });
    });
});