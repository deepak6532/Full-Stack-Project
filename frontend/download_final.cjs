const https = require('https');
const fs = require('fs');
const path = require('path');

// Fallback image path (already exists and verified as a car)
const fallbackPath = path.resolve(__dirname, 'src/assets/slider/xuv700.jpg');
const dest = path.resolve(__dirname, 'src/assets/types/suv.jpg');

const url = 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg';

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'image/jpeg,image/png,image/*'
            }
        };

        const req = https.get(url, options, (response) => {
            // Follow redirects
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
                // Check size (if it's a tiny error page)
                const stats = fs.statSync(dest);
                if (stats.size < 5000) {
                    reject(new Error('File too small, likely error page'));
                } else {
                    resolve(dest);
                }
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Timeout'));
        });
    });
}

console.log('Attempting to download Scorpio N...');
download(url, dest)
    .then(() => console.log('✅ Success: Downloaded Scorpio N from Wikimedia'))
    .catch((err) => {
        console.error(`⚠️ Download failed: ${err.message}`);
        console.log('🔄 Using fallback XUV700 image...');
        try {
            fs.copyFileSync(fallbackPath, dest);
            console.log('✅ Success: Copied XUV700 to SUV');
        } catch (copyErr) {
            console.error(`❌ Fallback failed: ${copyErr.message}`);
        }
    });
