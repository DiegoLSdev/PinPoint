import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: passwordHash,
            username,
            urls: [
                {
                    title: "Twitch",
                    favicon: "https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png",
                    url: "https://www.twitch.tv",
                    category: "Media"
                },
                {
                    title: "Netflix",
                    favicon: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico",
                    url: "https://www.netflix.com",
                    category: "Media"
                },
                {
                    title: "YouTube",
                    favicon: "https://www.youtube.com/s/desktop/31aab7a7/img/favicon_144x144.png",
                    url: "https://www.youtube.com",
                    category: "Media"
                },
                {
                    title: "Figma",
                    favicon: "https://static.figma.com/app/icon/1/favicon.png",
                    url: "https://www.figma.com",
                    category: "Design"
                },
                {
                    title: "Miro",
                    favicon: "https://miro.com/favicon.ico",
                    url: "https://miro.com",
                    category: "Design"
                },
                {
                    title: "Canva",
                    favicon: "https://www.canva.com/favicon.ico",
                    url: "https://www.canva.com",
                    category: "Design"
                },
                {
                    title: "GitHub",
                    favicon: "https://github.githubassets.com/favicons/favicon.png",
                    url: "https://www.github.com",
                    category: "Development"
                },
                {
                    title: "Vercel",
                    favicon: "https://vercel.com/favicon.ico",
                    url: "https://vercel.com",
                    category: "Development"
                },
                {
                    title: "Stack Overflow",
                    favicon: "https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico",
                    url: "https://stackoverflow.com",
                    category: "Development"
                },
                {
                    title: "Gmail",
                    favicon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
                    url: "https://mail.google.com",
                    category: "Email"
                },
                {
                    title: "Apple Email",
                    favicon: "https://www.apple.com/favicon.ico",
                    url: "https://www.icloud.com/mail",
                    category: "Email"
                },
                {
                    title: "Outlook",
                    favicon: "https://outlook.live.com/favicon.ico",
                    url: "https://outlook.live.com",
                    category: "Email"
                },
                {
                    title: "LinkedIn",
                    favicon: "https://static-exp1.licdn.com/sc/h/1bt1uwq5akv756knzdj4l6cdc",
                    url: "https://www.linkedin.com",
                    category: "Job Search"
                },
                {
                    title: "InfoJobs",
                    favicon: "https://www.infojobs.net/favicon.ico",
                    url: "https://www.infojobs.net",
                    category: "Job Search"
                },
                {
                    title: "Hosco",
                    favicon: "https://www.hosco.com/static/favicon.ico",
                    url: "https://www.hosco.com",
                    category: "Job Search"
                },
            ]
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie('token', token, {
            httpOnly: true,  // Prevents client-side JS from accessing the cookie
            secure: true,    // Ensures the cookie is sent over HTTPS
            sameSite: 'None' // Required for cross-site requests
        });
        res.json({
            token,
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

        const token = jwt.sign({ id: userFound._id }, TOKEN_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,  // Prevents client-side JS from accessing the cookie
            secure: true,    // Ensures the cookie is sent over HTTPS
            sameSite: 'None' // Required for cross-site requests
        });
        res.json({ message: "Login successful", token }); // Return response

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, secure: true });
        res.json({ message: "Logged out" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
};
