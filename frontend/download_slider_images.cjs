
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
    // Bentley Bentayga (Gold/Brownish) - Similar to Renax
    { url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop', file: 'slider/bentley.jpg' },
    // Audi R8 (Sport)
    { url: 'https://images.unsplash.com/photo-1603584173870-7b299f584b76?q=80&w=2071&auto=format&fit=crop', file: 'slider/audi.jpg' },
    // SUV (Ford Explorer or similar luxury SUV)
    { url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop', file: 'slider/suv.jpg' }
];

const sliderDir = path.join(__dirname, 'src', 'assets', 'slider');

if (!fs.existsSync(sliderDir)) fs.mkdirSync(sliderDir, { recursive: true });

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
