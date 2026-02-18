import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        const request = https.get(url, (response) => {
            // Check for redirect
            if (response.statusCode === 301 || response.statusCode === 302) {
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filepath}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
};

// Images for Car Types and Additional Vehicles
const images = [
    // Car Types
    { url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop', file: 'types/luxury.jpg' },
    { url: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=600&auto=format&fit=crop', file: 'types/sport.jpg' },
    { url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop', file: 'types/suv.jpg' },

    // Additional Vehicles for Slider
    { url: 'https://images.unsplash.com/photo-1605559424843-9e4c2287f386?q=80&w=600&auto=format&fit=crop', file: 'cars/audi-r8.jpg' },
    { url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop', file: 'cars/chevrolet-camaro.jpg' },
    { url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop', file: 'cars/bmw-m4.jpg' }
];

const carsDir = path.join(__dirname, 'src', 'assets', 'cars');
const typesDir = path.join(__dirname, 'src', 'assets', 'types');

if (!fs.existsSync(carsDir)) fs.mkdirSync(carsDir, { recursive: true });
if (!fs.existsSync(typesDir)) fs.mkdirSync(typesDir, { recursive: true });

const downloadAll = async () => {
    for (const img of images) {
        try {
            await downloadImage(img.url, path.join(__dirname, 'src', 'assets', img.file));
        } catch (error) {
            console.error(`Error downloading ${img.file}:`, error);
        }
    }
};

downloadAll();
