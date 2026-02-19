const https = require('https');
const fs = require('fs');
const path = require('path');

const cars = [
    {
        name: 'bolero',
        url: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero/10754/1697696929365/front-left-side-47.jpg',
        dest: 'public/cars/bolero.jpg'
    },
    {
        name: 'wagonr',
        url: 'https://images.carandbike.com/car-images/colors/maruti-suzuki/wagon-r/maruti-suzuki-wagon-r-poolside-blue.png',
        dest: 'public/cars/wagonr.jpg'
    },
    {
        name: 'tiago',
        url: 'https://images.carandbike.com/car-images/colors/tata/tiago/tata-tiago-flame-red.png',
        dest: 'public/cars/tiago.jpg'
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
    for (const car of cars) {
        try {
            const destPath = path.resolve(__dirname, car.dest);
            console.log(`Downloading ${car.name}...`);
            await download(car.url, destPath);
            console.log(`✅ Success: ${car.name}`);
        } catch (e) {
            console.log(`❌ Failed ${car.name}: ${e.message}`);
        }
    }
}

main();
