import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    title: { type: String, required: true },
    favicon: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, required: true },
}, { _id: true }); // Ensures each url has a unique _id

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    urls: {
        type: [urlSchema],
        default: []

    }
}, { timestamps: true });

export default mongoose.model('urlmanagerusers', UserSchema);
