import express from 'express';
import { submitQuery } from '../controllers/userQueryController';

const router = express.Router();

router.post('/submit', submitQuery);

export default router;
