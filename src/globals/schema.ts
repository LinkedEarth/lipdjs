import { SYNONYMS } from './synonyms';

export const SCHEMA = {
    'Dataset': {
        '@id': ['{dataSetName}'],
        '@toJson_pre': [
            'setArchiveTypeLabel'
        ],
        'datasetId': {
            'name': 'hasDatasetId'
        },
        'dataSetName': { 
            'name': 'hasName', 
            'alternates': ['paleoArchiveName'] 
        },
        'dataSource': { 
            'name': 'hasDataSource'
        },
        'originalDataURL': { 
            'name': 'hasOriginalDataUrl', 
            'alternates': ['originalDataUrl', 'additionalDataUrl', 'originalDataSource', 'originalDataURL', 'originalSourceUrl', 'paleoData_WDSPaleoUrl'] 
        },
        'dataContributor': {
            'name': 'hasContributor',
            'schema': 'Person',
            'alternates': ['whoEnteredinDB', 'MetadataEnteredByWhom', 'contributorName'],
            'fromJson': 'parsePersons',
            'multiple': true,
        },
        'archiveType': {
            'name': 'hasArchiveType', 
            'alternates':[
                'archive',
                'paleoDataArchive',
                'paleoData_Archive',
                'Archive'
            ],
            'type': 'Individual',
            'synonyms': SYNONYMS['ARCHIVES']['ArchiveType'],
            'class_range': 'ArchiveType',
            'skip_auto_convert_to_json': true
        },
        'changelog': {
            'name': 'hasChangeLog',
            'schema': 'ChangeLog',
            'multiple': true
        },
        'notes': {
            'name': 'hasNotes'
        },
        'collectionName': {
            'name': 'hasCollectionName',
            'alternates': ['collectionName1', 'collectionName2', 'collectionName3']
        },
        'collectionYear': {
            'name': 'hasCollectionYear'
        },
        'investigator': {
            'name': 'hasInvestigator',
            'alternates': ['investigators'],
            'schema': 'Person',
            'multiple': true,
            'fromJson': 'parsePersons'
        },
        'creator': {
            'name': 'hasCreator',
            'schema': 'Person',
            'multiple': true,
            'fromJson': 'parsePersons'
        },
        'funding': { 
            'name': 'hasFunding', 
            'multiple': true, 
            'schema': 'Funding' 
        },
        'pub': { 
            'name': 'hasPublication', 
            'multiple': true, 
            'schema': 'Publication' 
        },
        'geo': {
            'name': 'hasLocation',
            'schema': 'Location',
            'fromJson': 'parseLocation',
            'toJson': 'locationToJson'
        },
        'paleoData': {
            'name': 'hasPaleoData',
            'multiple': true,
            'schema': 'PaleoData'
        },
        'chronData': {
            'name': 'hasChronData',
            'multiple': true,
            'schema': 'ChronData'
        },
        'googleSpreadSheetKey': {
            'name': 'hasSpreadsheetLink',
            'fromJson': 'getGoogleSpreadsheetUrl',
            'toJson': 'getGoogleSpreadsheetKey'
        },
        'dataSetVersion': { 
            'name': 'hasVersion' 
        },
        'compilation_nest': {
            'name': 'hasCompilationNest',
            'alternates': ['pages2kRegion', 'paleoDIVERSiteId', 'sisalSiteId', 'LegacyClimateDatasetId', 
                           'LegacyClimateSiteId', 'ch2kCoreCode', 'coralHydro2kGroup', 'iso2kCertification', 
                           'iso2kUI', 'ocean2kID', 'pages2kId', 'pages2kID', 'QCCertification', 'SISALEntityID' ]
        }
    },
    'Compilation': {
        '@id': ['{compilationName}', '.', '{@id}'],
        'compilationName': {
            'name': 'hasName'
        },
        'compilationVersion': {
            'name': 'hasVersion'
        }
    },
    'ChangeLog': {
        '@id': ['{@parent.@id}', '.ChangeLog.', '{@index}'],
        '@category': 'ChangeLog',
        '@toJson': ['changesToJson'],
        'curator': {
            'name': 'hasContributor',
        },
        'version': {
            'name': 'hasVersion'
        },
        'lastVersion': {
            'name': 'hasLastVersion'
        },
        'timestamp': {
            'name': 'hasTimestamp'
        },
        'changes': {
            'name': 'hasChanges',
            'multiple': true,
            'type': 'Individual',
            'schema': 'Change',
            'fromJson': 'parseChanges'
        },
        'notes': {
            'name': 'hasNotes'
        }
    },
    'Change': {
        '@id': ['{@parent.@id}', '.Change.', '{@index}'],
        'name': {
            'name': 'hasName'
        },
        'notes': {
            'name': 'hasNotes',
            'multiple': true
        }
    },
    'Funding': {
        '@id': [
            '{fundingAgency|agency}',
            '.',
            '{fundingGrant|grant}'
        ],
        'agency': { 
            'name': 'hasFundingAgency', 
            'alternates': ['fundingAgency'] 
        },
        'grant': {
            'name': 'hasGrant',
            'multiple': true,
            'alternates': ['fundingGrant']
        },
        'country': {
            'name': 'hasFundingCountry',
            'alternates': ['fundingCountry']
        },
        'investigator': {
            'name': 'hasInvestigator',
            'schema': 'Person',
            'multiple': true,
            'fromJson': 'parsePersons'
        }       
    },
    'Publication': {
        '@id': [
            'Publication.',
            '{identifier.0.id|@parent.dataSetName}',
            '{index}'
        ],
        'title': { 
            'name': 'hasTitle' 
        },
        'abstract': { 
            'name': 'hasAbstract'
        },
        'institution': { 
            'name': 'hasInstitution'
        },
        'issue': { 
            'name': 'hasIssue'
        },
        'journal': { 
            'name': 'hasJournal'
        },    
        'volume': { 
            'name': 'hasVolume',
            'type': 'string'
        },
        'pages': { 
            'name': 'hasPages'
        },
        'year': { 
            'name': 'hasYear', 
            'type': 'integer',
            'alternates': ['pubYear'] 
        },        
        'publisher': { 
            'name': 'hasPublisher'
        },
        'report': { 
            'name': 'hasReport'
        },
        'type': { 
            'name': 'hasType'
        },
        'citation': { 
            'name': 'hasCitation', 
            'type': 'string'
        },
        'citeKey': { 
            'name': 'hasCiteKey', 
            'type': 'string'
        },
        'url': { 
            'name': 'hasUrl', 
            'alternates': ['link'],
            'multiple': true 
        },
        'dataUrl': { 
            'name': 'hasDataUrl', 
            'alternates': ['data_Url', 'pubDataUrl'],
            'multiple': true 
        },
        'doi': {
            'name': 'hasDOI',
            'type': 'string',
            'alternates': ['DOI']
        },
        'author': {
            'name': 'hasAuthor',
            'alternates': ['authors'],
            'schema': 'Person',
            'multiple': true,
            'fromJson': 'parsePersons'
        },
        'firstauthor': {
            'name': 'hasFirstAuthor',
            'alternates': ['firstAuthor'],
            'schema': 'Person',
            'fromJson': 'parsePersons'
        }
    },
    'PaleoData': {
        '@id': [
            '{@parent.dataSetName}',
            '.PaleoData',
            '{@index}'
        ],
        'paleoDataName': { 
            'name': 'hasName' 
        },
        'measurementTable': {
            'alternates': ['paleoMeasurementTable'],
            'name': 'hasMeasurementTable',
            'multiple': true,
            'schema': 'DataTable'
        },
        'model': {
            'alternates': ['paleoModel'],            
            'name': 'modeledBy',
            'multiple': true,
            'schema': 'Model'
        }
    },
    'ChronData': {
        '@id': [
            '{@parent.dataSetName}',
            '.ChronData',
            '{@index}'
        ],
        'measurementTable': {
            'alternates': ['chronMeasurementTable'],
            'name': 'hasMeasurementTable',
            'multiple': true,
            'schema': 'DataTable'
        },
        'model': {
            'alternates': ['chronModel'],            
            'name': 'modeledBy',
            'multiple': true,
            'schema': 'Model'
        }
    },
    'Model': {
        '@id': ['{@parent.@id}', '.Model', '{@index}'],
        'method': { 
            'name': 'hasCode'
        },
        'summaryTable': {
            'name': 'hasSummaryTable',
            'multiple': true,
            'schema': 'DataTable'
        },
        'ensembleTable': {
            'name': 'hasEnsembleTable',
            'multiple': true,
            'schema': 'DataTable'
        },
        'distributionTable': {
            'name': 'hasDistributionTable',
            'multiple': true,
            'schema': 'DataTable'
        }
    },    
    'DataTable': {
        '@id': ['{filename}', '_trunc(4)'],
        'filename': { 
            'name': 'hasFileName'
        },
        'columns': {
            'name': 'hasVariable',
            'multiple': true,
            'schema': 'Variable'
        },
        'missingValue': { 
            'name': 'hasMissingValue' 
        }
    },
    'Variable': {
        '@id': [
            '{foundInTable|@parent.@id}',
            '.',
            '{TSid|tsid|tSid}',
            '.',
            '{variableName|name}'
        ],
        '@fromJson': [
            'wrapUncertainty',
            'addFoundInTable',
            'addFoundInDataset',
            'addVariableValues',
            'addStandardVariable',
            'stringifyColumnNumbersArray'
        ],
        '@toJson_pre': [
            'removeFoundInTable',
            'removeFoundInDataset',
            'setVariableNameFromStandardVariableLabel',
            'setUnitsLabel',
            'setProxyLabel',
            'setArchiveTypeLabel',
            'setProxyGeneralLabel'
        ],
        '@toJson': [
            'unwrapUncertainty',
            'extractVariableValues',
            'unarrayColumnNumber'
        ],
        'number': { 
            'name': 'hasColumnNumber', 
            'type': 'integer'
        },
        'TSid': { 
            'name': 'hasVariableId', 
            'alternates': ['tsid', 'tSid'] 
        },
        'variableName': { 
            'name': 'hasName' 
        },
        'variableType': { 
            'name': 'hasType' 
        },
        'archiveType': {
            'name': 'hasArchiveType', 
            'alternates':[
                'archive',
                'paleoDataArchive',
                'paleoData_Archive',
                'Archive'
            ],
            'type': 'Individual',
            'synonyms': SYNONYMS.ARCHIVES?.ArchiveType,
            'class_range': 'ArchiveType',
            'skip_auto_convert_to_json': true
        },
        'units': { 
            'name': 'hasUnits',
            'type': 'Individual',
            'synonyms': SYNONYMS.UNITS?.PaleoUnit,
            'class_range': 'PaleoUnit',
            'skip_auto_convert_to_json': true
        },
        'missingValue': { 
            'name': 'hasMissingValue' 
        },
        'hasMaxValue': { 
            'name': 'hasMaxValue', 
            'alternates': ['hasMax'], 
            'type': 'float' 
        },
        'hasMinValue': { 
            'name': 'hasMinValue', 
            'alternates': ['hasMin'], 
            'type': 'float' 
        },
        'hasMeanValue': { 
            'name': 'hasMeanValue', 
            'alternates': ['hasMean'], 
            'type': 'float' 
        },
        'hasMedianValue': { 
            'name': 'hasMedianValue', 
            'alternates': ['hasMedian'], 
            'type': 'float' 
        },
        'description': {
            'name': 'hasDescription'
        },
        'isPrimary': {
            'name': 'isPrimary',
            'type': 'boolean'
        },
        'isComposite': {
            'name': 'isComposite',
            'type': 'boolean'
        },
        'measurementInstrument': {
            'name': 'hasInstrument',
            'type': 'Individual',
            'category': 'Instrument'
        },
        'calibration': {
            'name': 'calibratedVia',
            'schema': 'Calibration',
            'type': 'Individual',
            'multiple': true
        },
        'interpretation': {
            'name': 'hasInterpretation',
            'schema': 'Interpretation',
            'category': 'Interpretation',
            'type': 'Individual',
            'multiple': true
        },
        'resolution': {
            'name': 'hasResolution',
            'category': 'Resolution',
            'schema': 'Resolution',
            'type': 'Individual',
            'alternates': ['hasResolution']
        },
        'physicalSample': {
            'name': 'hasPhysicalSample',
            'schema': 'PhysicalSample',
            'category': 'PhysicalSample',
            'alternates': ['hasPhysicalSample'],
            'type': 'Individual',
            'multiple': true
        },
        'uncertainty': { 
            'name': 'hasUncertainty'         
        },
        'uncertaintyAnalytical': { 
            'name': 'hasUncertaintyAnalytical'
        },
        'uncertaintyReproducibility': { 
            'name': 'hasUncertaintyReproducibility'
        },
        'proxy': {
            'name': 'hasProxy',
            'type': 'Individual',
            'synonyms': SYNONYMS.PROXIES?.PaleoProxy,
            'class_range': 'PaleoProxy',
            'skip_auto_convert_to_json': true
        },
        'proxyGeneral': {
            'name': 'hasProxyGeneral',
            'type': 'Individual',
            'synonyms': SYNONYMS.PROXIES?.PaleoProxyGeneral,
            'class_range': 'PaleoProxyGeneral',
            'skip_auto_convert_to_json': true
        },
        'inCompilationBeta': {
            'name': 'partOfCompilation',
            'schema': 'Compilation',
            'category': 'Compilation'
        },
        'notes': {
            'name': 'hasNotes',
            'alternates': ['qcNotes', 'qCNotes', 'qCnotes', 'qcnotes', 'QCnotes', 'QCNotes']
        },
        'hasValues': {
            'type': 'string'
        },
        'foundInTable': {
            'type': 'Individual'
        },
        'foundInDataset': {
            'type': 'Individual'
        },
        'hasStandardVariable': {
            'type': 'EnumeratedIndividual',
            'synonyms': SYNONYMS.VARIABLES?.PaleoVariable,
            'class_range': 'PaleoVariable',
            'skip_auto_convert_to_json': true
        }        
    },
    'PhysicalSample': {
        'hasidentifier': { 
            'name': 'hasIGSN' 
        },
        'hasname': { 
            'name': 'name' 
        },
        'housedat': { 
            'name': 'housedAt' 
        }
    },
    'Resolution': {
        '@id': ['{@parent.@id}', '.Resolution'],
        '@toJson_pre': [
            'setUnitsLabel'
        ],
        'hasMaxValue': { 'name': 'hasMaxValue', 'alternates': ['hasMax'], 'type': 'float' },
        'hasMinValue': { 'name': 'hasMinValue', 'alternates': ['hasMin'], 'type': 'float' },
        'hasMeanValue': { 'name': 'hasMeanValue', 'alternates': ['hasMean'], 'type': 'float' },
        'hasMedianValue': { 'name': 'hasMedianValue', 'alternates': ['hasMedian'], 'type': 'float' },
        'units': { 
            'name': 'hasUnits',
            'type': 'Individual',
            'synonyms': SYNONYMS.UNITS?.PaleoUnit,
            'class_range': 'PaleoUnit',
            'skip_auto_convert_to_json': true
        }
    },
    'Location': {
        '@id': ['{@parent.dataSetName}', '.Location'],
        'coordinates': { 
            'type': 'Geographic_coordinate',
            'class_type': 'string'
        },
        'coordinatesFor': { 
            'type': 'Individual' 
        },
        'type': { 'name': 'hasType' },
        'continent': { 'name': 'hasContinent' },
        'country': { 'name': 'hasCountry' },
        'countryOcean': { 'name': 'hasCountryOcean' },
        'description': { 'name': 'hasDescription' },
        'elevation': { 'name': 'hasElevation' },
        'geometryType': { 'name': 'hasGeometryType' },
        'latitude': { 'name': 'hasLatitude' },
        'longitude': { 'name': 'hasLongitude' },
        'locationName': { 'name': 'hasLocationName', 'alternates': ['secondarySiteName'] },
        'ocean': { 'name': 'hasOcean', 'alternates': ['ocean2'] },
        'siteName': { 'name': 'hasSiteName' },
        'notes': { 'name': 'hasNotes' }
    },
    'Interpretation': {
        '@id': [
            '{@parent.@id}',
            '.Interpretation',
            '{@index}'
        ],
        '@fromJson': ['addInterpretationRank'],
        '@toJson_pre': [
            'setUnitsLabel',
            'setSeasonalityLabels',
            'setInterpretationVariableLabel'
        ],        
        'variable': { 
            'name': 'hasVariable',
            'type': 'Individual',
            'synonyms': SYNONYMS['INTERPRETATION']['InterpretationVariable'],
            'class_range': 'InterpretationVariable',
            'skip_auto_convert_to_json': true
        },
        'variableGeneral': { 
            'name': 'hasVariableGeneral',
            'alternates': ['variableGroup']
        },
        'variableGeneralDirection': { 
            'name': 'hasVariableGeneralDirection',
            'alternates': ['variableGroupDirection'] 
        },
        'variableDetail': { 
            'name': 'hasVariableDetail', 
            'alternates': ['variabledetail'] 
        },        
        'seasonality': { 
            'name': 'hasSeasonality',
            'type': 'Individual',
            'synonyms': SYNONYMS['INTERPRETATION']['InterpretationSeasonality'],
            'class_range': 'InterpretationSeasonality',
            'skip_auto_convert_to_json': true
        },
        'seasonalityOriginal': { 
            'name': 'hasSeasonalityOriginal',
            'type': 'Individual',
            'synonyms': SYNONYMS['INTERPRETATION']['InterpretationSeasonality'],
            'class_range': 'InterpretationSeasonality',
            'skip_auto_convert_to_json': true
        },
        'seasonalityGeneral': { 
            'name': 'hasSeasonalityGeneral',
            'type': 'Individual',
            'synonyms': SYNONYMS['INTERPRETATION']['InterpretationSeasonality'],
            'class_range': 'InterpretationSeasonality',
            'skip_auto_convert_to_json': true
        },
        'notes': { 'name': 'hasNotes' },
        'rank': { 'name': 'hasRank' }, // TODO: Auto-create if it doesnt exist
        'basis': { 'name': 'hasBasis' },
        'scope': { 'name': 'hasScope' },
        'mathematicalRelation': { 'name': 'hasMathematicalRelation' },
        'direction': { 
            'name': 'hasDirection', 
            'alternates': ['interpDirection']
        },
        'isLocal': { 
            'name': 'isLocal', 
            'alternates': ['local']
        }
    },
    'Calibration': {
        '@id': ['{@parent.@id}', '.Calibration'],
        '@fromJson': ['wrapUncertainty'],
        '@toJson': ['unwrapUncertainty'],
        'datasetRange': {
            'name': 'hasDatasetRange'
        },
        'doi': {
            'name': 'hasDOI',
            'alternates': ['calibrationDOI', 'hasDOI', 'transferFunctionDOI']
        },
        'equation': {
            'name': 'hasEquation',
            'alternates': ['calibrationEquation']
        },
        'equationIntercept': {
            'name': 'hasEquationIntercept'
        },
        'equationR2': {
            'name': 'hasEquationR2'
        },
        'equationSlope': {
            'name': 'hasEquationSlope'
        },
        'equationSlopeUncertainty': {
            'name': 'hasEquationSlopeUncertainty'
        },
        'method': {
            'name': 'hasMethod'
        },
        'methodDetail': {
            'name': 'hasMethodDetail'
        },
        'proxyDataset': {
            'name': 'hasProxyDataset',
            'alternates': ['transferFunctionTrainingSet']
        },
        'targetDataset': {
            'name': 'hasTargetDataset',
            'alternates': ['target', 'dataset']
        },
        'hasSeasonality': {
            'name': 'seasonality',
            'alternates': ['transferFunctionTrainingSet']
        },
        'notes': {
            'name': 'hasNotes',
            'alternates': ['Note']
        },
        'uncertainty': { 
            'name': 'hasUncertainty',
            'alternates': ['uncertainty', 'calibrationUncertainty', 'temperature12kUncertainty', 'transferFunctionUncertainty'],
        }
    },
    'Person': { 
        '@id': ['{name}'],
        'name': {
            'name': 'hasName'
        }
    }
}