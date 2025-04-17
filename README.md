# LiPDJS

A JavaScript/TypeScript library for reading, manipulating, and writing LiPD (Linked Paleo Data) files.

## About LiPD

LiPD (Linked Paleo Data) is a standardized data format for storing paleoclimate data. It uses a combination of JSON metadata and CSV data tables in a structured format, packaged as a zip archive with BagIt compliance.

## Features

- Read and parse LiPD (.lpd) files
- Convert between LiPD format and RDF graphs
- Create, modify, and query datasets using class-based API
- Generate LiPD files from RDF data
- BagIt-compliant file generation
- Full TypeScript support with type definitions

## Installation

```bash
npm install lipdjs
```

## Usage

### Loading LiPD Files

```typescript
import { LiPD } from 'lipdjs';

// Create a new LiPD instance
const lipd = new LiPD();

// Load a LiPD file or directory of LiPD files
await lipd.load('path/to/file.lpd');
// or
await lipd.loadFromDir('path/to/directory');

// Get all datasets
const datasets = await lipd.getDatasets();

// Work with datasets
console.log(datasets[0].getName());
```

### Creating and Modifying Datasets

```typescript
import { LiPD, Dataset, PaleoData, DataTable, Variable } from 'lipdjs';

// Create a new dataset
const dataset = new Dataset();
dataset.setName('MyDataset');
dataset.setArchiveType('LakeSediment');

// Add paleo data
const paleoData = new PaleoData();
const table = new DataTable();
table.setName('MyTable');
table.setFileName('mydata.csv');

// Add variables
const timeVar = new Variable();
timeVar.setVariableName('Year');
timeVar.setUnits('yr BP');
timeVar.setValues([1000, 2000, 3000, 4000, 5000]);

const tempVar = new Variable();
tempVar.setVariableName('Temperature');
tempVar.setUnits('degC');
tempVar.setValues([12.5, 13.2, 11.8, 10.5, 9.2]);

// Add variables to table
table.addVariable(timeVar);
table.addVariable(tempVar);

// Add table to paleoData
paleoData.addMeasurementTable(table);

// Add paleoData to dataset
dataset.addPaleoData(paleoData);

// Create a new LiPD object and add the dataset
const lipd = new LiPD();
lipd.loadDatasets([dataset]);

// Create a LiPD file
await lipd.createLipd('MyDataset', 'MyDataset.lpd');
```

### Converting to RDF

```typescript
import { LiPD, LipdToRDF } from 'lipdjs';

// Load a LiPD file
const lipd = new LiPD();
await lipd.load('path/to/file.lpd');

// Convert to RDF
const converter = new LipdToRDF();
converter.convert('path/to/file.lpd');

// Serialize to Turtle format
await converter.serialize('output.ttl', 'turtle');
```

### Querying Data

```typescript
import { LiPD } from 'lipdjs';

const lipd = new LiPD();
await lipd.load('path/to/file.lpd');

// Filter by dataset name
const filtered = await lipd.filterByDatasetName('MyDataset');

// Filter by time range
const timeFiltered = await lipd.filterByTime([1000, 2000], 'any');

// Get a time series
const series = lipd.toLipdSeries();
```

## API Documentation

The library exports multiple classes that can be used to work with LiPD data:

- `LiPD` - Main class for working with LiPD files
- `Dataset` - Represents a paleoclimate dataset
- `PaleoData` - Contains measurement tables for paleoclimate proxies
- `ChronData` - Contains chronology measurement tables
- `DataTable` - Represents a data table with variables
- `Variable` - Represents a column of data with metadata
- `LipdToRDF` - Converts LiPD files to RDF graphs
- `RDFToLiPD` - Converts RDF graphs to LiPD files

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This library is licensed under the MIT License.

## Acknowledgments

LiPDJS is developed by the LinkedEarth team. It is a JavaScript/TypeScript port of the Python [PyLiPD](https://github.com/nickmckay/LiPD-utilities) library. 