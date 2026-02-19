const https = require('https');
const fs = require('fs');
const path = require('path');

// Candidate URLs (CarWale, CarAndBike)
const urls = [
    'https://imgd.aeplcdn.com/1280x720/n/cw/ec/107543/vitara-brezza-2022-exterior-right-front-three-quarter.jpeg',
    'https://images.carandbike.com/car-images/colors/maruti-suzuki/brezza/maruti-suzuki-brezza-splendid-silver-with-midnight-black-roof.png'
];
const dest = path.resolve(__dirname, 'src/assets/cars/maruti-brezza.jpg');

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

        https.get(url, options, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    if (fs.statSync(dest).size > 5000) resolve(dest);
                    else reject(new Error('Too small'));
                });
            } else {
                reject(new Error(res.statusCode));
            }
        }).on('error', reject);
    });
}

async function main() {
    for (const url of urls) {
        try {
            console.log(`Trying ${url}...`);
            await download(url, dest);
            console.log('✅ Success: Brezza downloaded');
            return;
        } catch (e) {
            console.log(`❌ Failed: ${e.message}`);
        }
    }
    console.log('⚠️ All failed. Keeping fallback.');
}

main();
