#!/usr/bin/env node

/**
 * Script per l'ottimizzazione automatica delle immagini
 * Richiede: sharp, imagemin, imagemin-mozjpeg, imagemin-pngquant
 * 
 * Installazione: npm install -g sharp imagemin imagemin-mozjpeg imagemin-pngquant
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurazione
const CONFIG = {
    inputDir: path.join(__dirname, '../public'),
    outputDir: path.join(__dirname, '../public/optimized'),
    formats: ['webp', 'avif'],
    quality: {
        jpeg: 85,
        png: 85,
        webp: 85,
        avif: 80
    },
    sizes: {
        thumbnail: 150,
        small: 300,
        medium: 600,
        large: 1200,
        hero: 1920
    }
};

// Estensioni supportate
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.avif', '.gif', '.bmp'];

// Funzione principale
async function optimizeImages() {


    // Crea directory di output se non esiste
    if (!fs.existsSync(CONFIG.outputDir)) {
        fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }

    try {
        const files = await getImageFiles(CONFIG.inputDir);


        for (const file of files) {
            await optimizeImage(file);
        }


        await generateImageManifest();

    } catch (error) {
        console.error('❌ Errore durante l\'ottimizzazione:', error);
        process.exit(1);
    }
}

// Ottiene la lista delle immagini
async function getImageFiles(dir) {
    const files = [];

    function scanDirectory(currentDir) {
        const items = fs.readdirSync(currentDir);

        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory() && !item.startsWith('.') && item !== 'optimized') {
                scanDirectory(fullPath);
            } else if (stat.isFile() && isImageFile(item)) {
                files.push(fullPath);
            }
        }
    }

    scanDirectory(dir);
    return files;
}

// Verifica se è un file immagine
function isImageFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext);
}

// Ottimizza una singola immagine
async function optimizeImage(inputPath) {
    const filename = path.basename(inputPath);
    const ext = path.extname(filename).toLowerCase();
    const nameWithoutExt = path.basename(filename, ext);



    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Genera versioni ottimizzate in diversi formati
        for (const format of CONFIG.formats) {
            if (format === 'webp' && (ext === '.jpg' || ext === '.jpeg' || ext === '.avif')) {
                await generateWebP(image, inputPath, nameWithoutExt);
            }
            if (format === 'avif' && (ext === '.jpg' || ext === '.jpeg' || ext === '.avif')) {
                await generateAVIF(image, inputPath, nameWithoutExt);
            }
        }

        // Genera versioni responsive
        await generateResponsiveVersions(image, inputPath, nameWithoutExt, ext);



    } catch (error) {
        console.error(`❌ Errore con ${filename}:`, error.message);
    }
}

// Genera versione WebP
async function generateWebP(image, inputPath, nameWithoutExt) {
    const outputPath = path.join(CONFIG.outputDir, `${nameWithoutExt}.webp`);

    await image
        .webp({ quality: CONFIG.quality.webp })
        .toFile(outputPath);
}

// Genera versione AVIF
async function generateAVIF(image, inputPath, nameWithoutExt) {
    const outputPath = path.join(CONFIG.outputDir, `${nameWithoutExt}.avif`);

    await image
        .avif({ quality: CONFIG.quality.avif })
        .toFile(outputPath);
}

// Genera versioni responsive
async function generateResponsiveVersions(image, inputPath, nameWithoutExt, ext) {
    for (const [sizeName, width] of Object.entries(CONFIG.sizes)) {
        const outputPath = path.join(CONFIG.outputDir, `${nameWithoutExt}-${sizeName}${ext}`);

        await image
            .resize(width, null, { withoutEnlargement: true })
            .jpeg({ quality: CONFIG.quality.jpeg })
            .toFile(outputPath);
    }
}

// Genera manifest delle immagini ottimizzate
async function generateImageManifest() {
    const manifest = {
        generated: new Date().toISOString(),
        images: {}
    };

    const files = fs.readdirSync(CONFIG.outputDir);

    for (const file of files) {
        const ext = path.extname(file);
        const name = path.basename(file, ext);

        if (!manifest.images[name]) {
            manifest.images[name] = [];
        }

        manifest.images[name].push({
            format: ext.substring(1),
            path: `/optimized/${file}`,
            size: fs.statSync(path.join(CONFIG.outputDir, file)).size
        });
    }

    const manifestPath = path.join(CONFIG.outputDir, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));


}

// Esegui lo script
if (import.meta.url === `file://${process.argv[1]}`) {
    optimizeImages();
}

export default optimizeImages;
