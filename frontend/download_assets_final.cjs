
const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        const request = https.get(url, (response) => {
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

const images = [
    // Pexels Images (More reliable direct links)
    { url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600', file: 'types/sport.jpg' },
    { url: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600', file: 'cars/audi-r8.jpg' }
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
