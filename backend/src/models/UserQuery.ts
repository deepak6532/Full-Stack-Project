import mongoose, { Schema, Document } from 'mongoose';

export interface IUserQuery extends Document {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    createdAt: Date;
}

const UserQuerySchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUserQuery>('UserQuery', UserQuerySchema);
