import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
    getUrls,
    addUrl,
    deleteUrl
} from '../controllers/urls.controller.js';

const router = Router();

router.get('/api/urls', authRequired, getUrls);
router.post('/api/url/add', authRequired, addUrl);
router.delete('/api/url/:urlId', authRequired, deleteUrl); // Updated route

export default router;
