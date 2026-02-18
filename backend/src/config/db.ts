import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Cloud MongoDB Connection Error: ${error}`);
        console.log('⚠️ Attempting to connect to Local MongoDB...');
        try {
            const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/sharma-car-rental');
            console.log(`✅ Local MongoDB Connected: ${localConn.connection.host}`);
        } catch (localError) {
            console.error(`❌ Local MongoDB Connection Error: ${localError}`);
            process.exit(1);
        }
    }
};

export default connectDB;
