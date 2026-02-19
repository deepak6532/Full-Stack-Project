const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://images.carandbike.com/car-images/colors/maruti-suzuki/dzire/maruti-suzuki-dzire-arctic-white.png';
const dest = 'src/assets/types/sedan.jpg';

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

download(url, path.resolve(__dirname, dest))
    .then((path) => {
        const stats = fs.statSync(path);
        console.log(`✅ Downloaded: ${dest} (${(stats.size / 1024).toFixed(1)} KB)`);
    })
    .catch((err) => console.error(`❌ Failed: ${err.message}`));
