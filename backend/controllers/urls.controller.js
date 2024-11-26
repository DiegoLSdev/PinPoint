import User from '../models/user.model.js';
import { createUrlSchema } from '../schemas/url.schema.js';

export const getUrls = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.urls); // Return the user's URLs
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addUrl = async (req, res) => {
    try {
        const validatedData = createUrlSchema.safeParse(req.body);
        if (!validatedData.success) {
            console.log(validatedData.error.errors);
            return res.status(400).json({ error: validatedData.error.errors.map(err => err.message) });
        }

        const { title, favicon, url, category } = validatedData.data;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const urlExists = user.urls.find(url => url.title === title);
        if (urlExists) {
            return res.status(400).json({ message: 'URL already exists' });
        }

        user.urls.push({ title, favicon, url, category });
        await user.save();

        res.status(201).json(user.urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteUrl = async (req, res) => {
    try {
        const { urlId } = req.params;
        const user = await User.findOneAndUpdate(
            { 'urls._id': urlId },
            { $pull: { urls: { _id: urlId } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'URL not found' });
        }

        res.status(204).json({ message: 'URL deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
