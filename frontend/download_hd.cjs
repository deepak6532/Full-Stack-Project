const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    {
        url: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Thar/10745/1697697308167/front-left-side-47.jpg',
        dest: 'src/assets/slider/thar.jpg'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mahindra_XUV700_%28India%29_front_view.jpg/800px-Mahindra_XUV700_%28India%29_front_view.jpg',
        dest: 'src/assets/slider/xuv700.jpg'
    }
];

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': 'image/jpeg,image/png,image/*'
            }
        };

        https.get(url, options, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}`));
                return;
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(dest);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function main() {
    for (const img of images) {
        const destPath = path.resolve(__dirname, img.dest);
        try {
            await download(img.url, destPath);
            const stats = fs.statSync(destPath);
            console.log(`✅ Downloaded: ${img.dest} (${(stats.size / 1024).toFixed(1)} KB)`);
        } catch (err) {
            console.log(`❌ Failed: ${img.dest} - ${err.message}`);
        }
    }
}

main();
