
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
    // Wikimedia Commons reliable links
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Lamborghini_Huracan_EVO_RWD_Spyder.jpg/640px-Lamborghini_Huracan_EVO_RWD_Spyder.jpg', file: 'types/sport.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Audi_R8_Spyder_V10_Performance_Hinterbacke_%28cropped%29.jpg/640px-Audi_R8_Spyder_V10_Performance_Hinterbacke_%28cropped%29.jpg', file: 'cars/audi-r8.jpg' }
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
