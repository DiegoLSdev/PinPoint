import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import urlsRoutes from './routes/urls.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';


import axios from 'axios'

// const url = `https://pinpoint-3.onrender.com`; // Replace with your Render URL
// const interval = 30000; // Interval in milliseconds (30 seconds)

// function reloadWebsite() {
//   axios.get(url)
//     .then(response => {
//       console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
//     })
//     .catch(error => {
//       console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
//     });
// }
// setInterval(reloadWebsite, interval);


dotenv.config();

const app = express();
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());

const allowedOrigins = [
  'https://pinpoint-4.onrender.com',  // Producción
  'http://localhost:5173',            // Desarrollo local
  'http://localhost:5174',            // Desarrollo local
  'https://pinpoint-url-manager.onrender.com/'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite solicitudes sin 'origin' (como herramientas de Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Permitir envío de cookies
}));

// Rutas
app.use(authRoutes);
app.use(urlsRoutes);

export default app;