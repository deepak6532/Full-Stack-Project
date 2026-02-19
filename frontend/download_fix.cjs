const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    {
        url: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Dzire/9678/1704715569498/front-left-side-47.jpg',
        dest: 'src/assets/types/sedan.jpg'
    },
    {
        url: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio-N/9340/1690457460498/front-left-side-47.jpg',
        dest: 'src/assets/types/suv.jpg'
    }
];

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': 'image/jpeg,image/png,image/*',
                'Referer': 'https://www.cardekho.com/'
            }
        };

        https.get(url, options, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode} for ${url}`));
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
