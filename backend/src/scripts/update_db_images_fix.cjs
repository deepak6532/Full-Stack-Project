const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/car-rental-db';
console.log('Connecting to:', uri.replace(/:([^:@]+)@/, ':****@')); // Hide password in log

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const carSchema = new mongoose.Schema({
    name: String,
    image: String,
    // other fields...
}, { strict: false });

const Car = mongoose.model('Car', carSchema);

const updates = [
    { name: 'Bolero', image: '/cars/bolero.jpg' },
    { name: 'Wagon R', image: '/cars/wagonr.jpg' },
    { name: 'Tiago', image: '/cars/tiago.jpg' }
];

async function updateImages() {
    for (const update of updates) {
        const res = await Car.updateOne({ name: update.name }, { $set: { image: update.image } });
        if (res.nModified > 0 || res.modifiedCount > 0) {
            console.log(`✅ Updated ${update.name}`);
        } else {
            console.log(`⚠️ Could not find or update ${update.name}`);
        }
    }
    console.log('Done');
    process.exit();
}

updateImages();
