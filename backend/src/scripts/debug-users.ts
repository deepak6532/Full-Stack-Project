import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const checkUsers = async () => {
    try {
        console.log('Attempting to connect...');
        try {
            await mongoose.connect(process.env.MONGODB_URI as string);
            console.log('Connected to Cloud DB');
        } catch (e) {
            console.log('Cloud DB failed, trying Local DB...');
            await mongoose.connect('mongodb://127.0.0.1:27017/sharma-car-rental');
            console.log('Connected to Local DB');
        }

        const users = await User.find({}, 'name email role');
        console.log('--- USERS ---');
        users.forEach(u => {
            console.log(`${u.name} (${u.email}) - Role: ${u.role}`);
        });
        console.log('-------------');

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUsers();
