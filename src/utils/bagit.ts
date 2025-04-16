import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

/**
 * Create BagIt files for a directory
 * 
 * @param bagitDir The directory to create BagIt files in
 * @param metadata Optional metadata for bag-info.txt
 * @returns Promise that resolves when BagIt files are created
 */
export async function createBagitFiles(bagitDir: string, metadata: Record<string, string> = {}): Promise<void> {
    // Create bagit.txt
    const bagitContent = 'BagIt-Version: 1.0\nTag-File-Character-Encoding: UTF-8';
    fs.writeFileSync(path.join(bagitDir, 'bagit.txt'), bagitContent);
    
    // Create bag-info.txt
    const bagInfo = {
        'Bagging-Date': new Date().toISOString(),
        'Bag-Software-Agent': 'lipdjs',
        ...metadata
    };
    
    const bagInfoContent = Object.entries(bagInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    
    fs.writeFileSync(path.join(bagitDir, 'bag-info.txt'), bagInfoContent);
    
    // Create manifest-md5.txt
    await createManifest(bagitDir, 'md5');
}

/**
 * Create a manifest file for a BagIt directory
 * 
 * @param bagitDir The BagIt directory
 * @param algorithm The hash algorithm to use
 * @returns Promise that resolves when the manifest is created
 */
async function createManifest(bagitDir: string, algorithm: string): Promise<void> {
    const dataDir = path.join(bagitDir, 'data');
    const manifestPath = path.join(bagitDir, `manifest-${algorithm}.txt`);
    
    // Get all files in the data directory
    const files = getAllFiles(dataDir);
    
    // Calculate checksums for each file
    const checksums = await Promise.all(
        files.map(async (file) => {
            const relativePath = path.relative(bagitDir, file).replace(/\\/g, '/');
            const checksum = await calculateChecksum(file, algorithm);
            return `${checksum} ${relativePath}`;
        })
    );
    
    // Write manifest file
    fs.writeFileSync(manifestPath, checksums.join('\n'));
}

/**
 * Get all files in a directory recursively
 * 
 * @param dir The directory to search
 * @returns Array of file paths
 */
function getAllFiles(dir: string): string[] {
    const files: string[] = [];
    
    function processDir(directory: string) {
        const entries = fs.readdirSync(directory, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(directory, entry.name);
            
            if (entry.isDirectory()) {
                processDir(fullPath);
            } else {
                files.push(fullPath);
            }
        }
    }
    
    processDir(dir);
    return files;
}

/**
 * Calculate checksum for a file
 * 
 * @param filePath Path to the file
 * @param algorithm Hash algorithm to use
 * @returns Promise that resolves with the checksum
 */
function calculateChecksum(filePath: string, algorithm: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(algorithm);
        const stream = fs.createReadStream(filePath);
        
        stream.on('error', (err) => {
            reject(err);
        });
        
        stream.on('data', (chunk) => {
            hash.update(chunk);
        });
        
        stream.on('end', () => {
            resolve(hash.digest('hex'));
        });
    });
} 