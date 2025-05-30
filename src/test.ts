import { LiPD } from './lipd';
import * as path from 'path';
import { Dataset } from './classes/dataset';
import { NSURL } from './globals/urls';
import { Logger, LogLevel } from './utils/logger';

const testDataDir = path.join(__dirname, '../examples/data');
const testFile = path.join(testDataDir, 'MD98_2181.Stott.2007.lpd');

const logger = Logger.getInstance();
// logger.setLogLevel(LogLevel.DEBUG);

const lipd = new LiPD();
lipd.setEndpoint('https://linkedearth.graphdb.mint.isi.edu/repositories/LiPDVerse-dynamic');
lipd.setRemote(true);
// lipd.getAllDatasetNames().then(datasetNames => {
    lipd.setRemote(false);
        
    //console.log(datasetNames);
    // Load the first dataset
    lipd.loadRemoteDatasets("Minnreg.UmbanhowarJr.2004", false).then(() => {
        console.log('Loaded remote datasets');
        lipd.getAllDatasetNames().then(datasetNames => {
            console.log(datasetNames);
        });
        lipd.getDatasets().then(datasets => {
            for(const ds of datasets) {
                console.log(ds.getName());
                console.log(ds.getDatasetId());
                console.log(ds.getArchiveType());
                console.log(ds.getPaleoData()[0].getMeasurementTables()[0].getDataFrame());
            }
        });
    });
// });


//   // Create a new LiPD instance for serialization
//   const lipd = new LiPD();
//   lipd.load(testFile).then(() => {
//     lipd.serialize("n3").then(n3 => {
//         // console.log('N3:', n3);
//         lipd.getDatasets().then(datasets => {
//             for (const ds of datasets) {
//                 // console.log('Dataset:', ds.getName());
//                 // console.log('Dataset ID:', ds.getDatasetId());
//                 // console.log('Dataset archive type:', ds.getArchiveType());
//                 // for(const pd of ds.getPaleoData()) {
//                 //     for(const table of pd.getMeasurementTables()) {
//                 //         console.log('MeasurementTable:', table.getFileName());
//                 //         console.log("Data:", table.getDataFrame());
//                 //         for(const v of table.getVariables()) {
//                 //             console.log('Variable:', v.getName());
//                 //             console.log('Variable type:', v.getVariableType());
//                 //             console.log('Variable column number:', v.getColumnNumber());
//                 //             console.log('Variable description:', v.getDescription());
//                 //             for(const interp of v.getInterpretations()) {
//                 //                 console.log('Interpretation:', interp.toJson());
//                 //                 console.log('Interpretation basis:', interp.getBasis());
//                 //                 console.log('Interpretation direction:', interp.getDirection());
//                 //                 console.log('Interpretation seasonality:', interp.getSeasonality());
//                 //                 console.log('Interpretation variable:', interp.getVariable());
//                 //             }
//                 //             const res = v.getResolution()
//                 //             if(res) {
//                 //                 console.log('Resolution:', res.toJson());
//                 //             }
                            
//                 //         }
//                 //     }
//                 // }
//                 console.log('--------------------------------');

//                 let json = ds.toJson();
//                 // console.log('JSON:', JSON.stringify(json, null, 2));
//                 // let dsuri = NSURL + "/" + ds.getName()
//                 let ds2: Dataset = Dataset.fromJson(json);
//                 // let json2 = ds2.toData();
//                 // console.log('JSON2:', json2);

//                 console.log('Dataset:', ds2.getName());
//                 console.log('Dataset ID:', ds2.getDatasetId());
//                 let changeLogs = ds2.getChangeLogs();
//                 for(const changelog of changeLogs) {
//                     console.log('--------------------------------');
//                     console.log('Contributor:', changelog.getContributor());
//                     console.log('Version:', changelog.getVersion());
//                     console.log('Last Version:', changelog.getLastVersion());
//                     console.log('Timestamp:', changelog.getTimestamp());
//                     console.log('Notes:', changelog.getNotes());
//                     for(const change of changelog.getChanges()) {
//                         console.log('- Change:', change.getName());
//                         console.log('- Change Notes:', change.getNotes());
//                     }
//                 }
//                 // for(const pd of ds2.getPaleoData()) {
//                 //     for(const table of pd.getMeasurementTables()) {
//                 //         console.log('MeasurementTable:', table.getFileName());
//                 //         console.log("Data:", table.getDataFrame());
//                 //         for(const v of table.getVariables()) {
//                 //             console.log('Variable:', v.getName());
//                 //             console.log('Variable type:', v.getVariableType());
//                 //             console.log('Variable column number:', v.getColumnNumber());
//                 //             console.log('Variable description:', v.getDescription());
//                 //             for(const interp of v.getInterpretations()) {
//                 //                 console.log('Interpretation:', interp.toJson());
//                 //                 console.log('Interpretation basis:', interp.getBasis());
//                 //                 console.log('Interpretation direction:', interp.getDirection());
//                 //                 console.log('Interpretation seasonality:', interp.getSeasonality());
//                 //                 console.log('Interpretation variable:', interp.getVariable());
//                 //             }
//                 //             const res = v.getResolution()
//                 //             if(res) {
//                 //                 console.log('Resolution:', res.toJson());
//                 //             }
                            
//                 //         }
//                 //     }
//                 // }
//             }
//         });


//         // lipd.getAllDatasetNames().then(datasetNames => {
//         //     const datasetJson = lipd.getLipd(datasetNames[0]);
//         //     // Debug: Print the raw JSON
//         //     console.log('Dataset JSON:', JSON.stringify(datasetJson, null, 2));

//         //     const dataset = Dataset.fromJson(datasetJson);

//         //     // Debug: Print the dataset properties
//         //     console.log('Dataset name:', dataset.getName());
//         //     console.log('Dataset ID:', dataset.getDatasetId());
//         //     console.log('Dataset type:', dataset.constructor.name);
//         //     for(const pd of dataset.getPaleoData()) {
//         //         for(const table of pd.getMeasurementTables()) {
//         //             console.log('MeasurementTable:', table.getFileName());
//         //             console.log("Data:", table.getDataFrame());
//         //             for(const v of table.getVariables()) {
//         //                 console.log('Variable:', v.getName());
//         //                 console.log('Variable type:', v.getVariableType());
//         //                 console.log('Variable column number:', v.getColumnNumber());
//         //                 console.log('Variable description:', v.getDescription());
//         //                 for(const interp of v.getInterpretations()) {
//         //                     console.log('Interpretation:', interp.toJson());
//         //                     console.log('Interpretation basis:', interp.getBasis());
//         //                     console.log('Interpretation direction:', interp.getDirection());
//         //                     console.log('Interpretation seasonality:', interp.getSeasonality());
//         //                     console.log('Interpretation variable:', interp.getVariable());
//         //                 }
//         //                 const res = v.getResolution()
//         //                 if(res) {
//         //                     console.log('Resolution:', res.toJson());
//         //                 }
                        
//         //             }
//         //         }
//         //     }
//         // });
//     // });
//   });
// });
