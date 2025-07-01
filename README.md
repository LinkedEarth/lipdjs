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
import { LiPD, Dataset, PaleoData, DataTable, Variable, ArchiveTypeConstants, PaleoUnitConstants } from 'lipdjs';

// Create a new dataset
const dataset = new Dataset();
dataset.setName('MyDataset');
dataset.setArchiveType(ArchiveTypeConstants.LakeSediment);

// Add paleo data
const paleoData = new PaleoData();
const table = new DataTable();
table.setFileName('mydata.csv');

// Add variables
const timeVar = new Variable();
timeVar.setName('Year');
timeVar.setUnits(PaleoUnitConstants.yr_BP);
timeVar.setValues("[1000, 2000, 3000, 4000, 5000]");

const tempVar = new Variable();
tempVar.setName('Temperature');
tempVar.setUnits(PaleoUnitConstants.degC);
tempVar.setValues("[12.5, 13.2, 11.8, 10.5, 9.2]");

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

## Browser Support

lipdjs works seamlessly in both Node.js and browser environments. The library automatically detects the environment and uses appropriate APIs.

### Loading Files in Browser

#### From URLs (Server-hosted files)
```typescript
import { LiPD } from 'lipdjs';

const lipd = new LiPD();
await lipd.load('https://example.com/data/myfile.lpd');
// or from relative path if served
await lipd.load('/static/data/myfile.lpd');

const datasets = await lipd.getDatasets();
```

#### From Local File System (User File Input)
For loading files directly from the user's local file system, use the `loadFromFile()` method with HTML5 File API:

```html
<!-- HTML file input -->
<input type="file" id="lipdFileInput" accept=".lpd" />
```

```typescript
import { LiPD } from 'lipdjs';

// Handle file selection
document.getElementById('lipdFileInput').addEventListener('change', async (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    
    const lipd = new LiPD();
    try {
      await lipd.loadFromFile(file);
      
      // Process the loaded data
      const datasets = await lipd.getDatasets();
      console.log(`Loaded ${datasets.length} datasets`);
      
      // Access dataset information
      for (const dataset of datasets) {
        console.log('Dataset:', dataset.getName());
        const paleoData = dataset.getPaleoData();
        // ... work with the data
      }
    } catch (error) {
      console.error('Error loading LiPD file:', error);
    }
  }
});
```

#### Multiple File Loading
```typescript
// Load multiple files sequentially
const fileInput = document.getElementById('multipleFiles') as HTMLInputElement;
fileInput.addEventListener('change', async (event) => {
  const files = event.target.files;
  if (files) {
    const lipd = new LiPD();
    
    for (const file of Array.from(files)) {
      if (file.name.endsWith('.lpd')) {
        await lipd.loadFromFile(file);
      }
    }
    
    const datasets = await lipd.getDatasets();
    console.log(`Total datasets loaded: ${datasets.length}`);
  }
});
```

#### React Example
```typescript
import React, { useState } from 'react';
import { LiPD } from 'lipdjs';

function LiPDLoader() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileLoad = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    try {
      const lipd = new LiPD();
      await lipd.loadFromFile(files[0]);
      const loadedDatasets = await lipd.getDatasets();
      setDatasets(loadedDatasets);
    } catch (error) {
      console.error('Error loading file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".lpd" 
        onChange={handleFileLoad}
        disabled={loading}
      />
      {loading && <p>Loading...</p>}
      {datasets.length > 0 && (
        <div>
          <h3>Loaded Datasets:</h3>
          {datasets.map((dataset, index) => (
            <div key={index}>{dataset.getName()}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Browser Compatibility Features
- **Automatic environment detection**: No configuration needed
- **ZIP processing**: Uses JSZip for browser-compatible archive extraction
- **CSV parsing**: Processes data tables in memory
- **File API support**: Direct loading from user-selected files
- **Memory efficient**: Streams large files without temporary storage
- **Error handling**: Graceful fallbacks and informative error messages

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

LiPDJS is developed by the LinkedEarth team. It is a JavaScript/TypeScript port of the Python [PyLiPD](https://github.com/LinkedEarth/pylipd) library. 