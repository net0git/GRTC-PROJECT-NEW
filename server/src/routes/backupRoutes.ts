import { Router } from 'express';
import backupController from '../controllers/backupController';

const router = Router();

router.post('/api/backup', backupController.generarBackup);

export default router;