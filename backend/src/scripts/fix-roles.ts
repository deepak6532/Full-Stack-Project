import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const fixRoles = async () => {
    try {
        console.log('Connecting...');
        try {
            await mongoose.connect(process.env.MONGODB_URI as string);
        } catch (e) {
            await mongoose.connect('mongodb://127.0.0.1:27017/sharma-car-rental');
        }
        console.log('Connected.');

        const email = 'khm@gmail.com';
        const user = await User.findOne({ email });
        if (user) {
            user.role = 'user';
            await user.save();
            console.log(`✅ Updated ${user.name} (${user.email}) to role: user`);
        } else {
            console.log(`User ${email} not found.`);
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

fixRoles();
