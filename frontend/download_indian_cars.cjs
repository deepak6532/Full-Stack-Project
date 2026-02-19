const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const images = [
    // Slider images
    {
        url: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/139139/safari-exterior-right-front-three-quarter-75.jpeg?isig=0&q=75',
        dest: 'src/assets/slider/safari.jpg',
        fallback: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Safari/10990/1690457753498/front-left-side-47.jpg'
    },
    // Featured car images
    {
        url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/144999/scorpio-n-exterior-right-front-three-quarter.jpeg?isig=0&q=75',
        dest: 'src/assets/cars/scorpio-n.jpg',
        fallback: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio-N/9340/1690457460498/front-left-side-47.jpg'
    },
    {
        url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/159099/brezza-exterior-right-front-three-quarter.jpeg?isig=0&q=75',
        dest: 'src/assets/cars/maruti-brezza.jpg',
        fallback: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Brezza/10908/1671009498498/front-left-side-47.jpg'
    },
    {
        url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/40530/tiago-exterior-right-front-three-quarter-27.jpeg?isig=0&q=75',
        dest: 'src/assets/cars/tata-tiago.jpg',
        fallback: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Tiago/9676/1704715664498/front-left-side-47.jpg'
    },
    {
        url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/43482/innova-hycross-exterior-right-front-three-quarter.jpeg?isig=0&q=75',
        dest: 'src/assets/cars/innova-hycross.jpg',
        fallback: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Innova-Hycross/9613/1671009498498/front-left-side-47.jpg'
    },
    {
        url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/112947/wagon-r-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75',
        dest: 'src/assets/cars/wagon-r.jpg',
        fallback: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Wagon-R/9614/1671009498498/front-left-side-47.jpg'
    },
    {
        url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/131131/bolero-exterior-right-front-three-quarter.jpeg?isig=0&q=75',
        dest: 'src/assets/cars/bolero.jpg',
        fallback: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero/9616/1671009498498/front-left-side-47.jpg'
    },
    // Car Types section images
    {
        url: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=75',
        dest: 'src/assets/types/hatchback.jpg',
        fallback: null // nexon already works
    },
    {
        url: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter.jpeg?isig=0&q=75',
        dest: 'src/assets/types/sedan.jpg',
        fallback: null // xuv700 already works
    },
    // Hero image
    {
        url: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter.jpeg?isig=0&q=75',
        dest: 'src/assets/images/hero-car.jpg',
        fallback: null
    }
];

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const protocol = url.startsWith('https') ? https : http;
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Referer': 'https://www.cardekho.com/',
            }
        };

        protocol.get(url, options, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode} for ${url}`));
                return;
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                // Check file size
                const stats = fs.statSync(dest);
                if (stats.size < 1000) {
                    fs.unlinkSync(dest);
                    reject(new Error(`File too small (${stats.size} bytes): ${dest}`));
                } else {
                    resolve(dest);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function main() {
    for (const img of images) {
        const destPath = path.resolve(__dirname, img.dest);
        if (fs.existsSync(destPath)) {
            const stats = fs.statSync(destPath);
            if (stats.size > 5000) {
                console.log(`✅ SKIP (already exists, ${(stats.size / 1024).toFixed(0)}KB): ${img.dest}`);
                continue;
            }
        }

        try {
            await download(img.url, destPath);
            console.log(`✅ Downloaded: ${img.dest}`);
        } catch (err) {
            console.log(`⚠️ Primary failed for ${img.dest}: ${err.message}`);
            if (img.fallback) {
                try {
                    await download(img.fallback, destPath);
                    console.log(`✅ Downloaded (fallback): ${img.dest}`);
                } catch (err2) {
                    console.log(`❌ Fallback also failed for ${img.dest}: ${err2.message}`);
                }
            } else {
                console.log(`❌ No fallback for ${img.dest}`);
            }
        }
    }
    console.log('\n🏁 Done!');
}

main();
