import { addUser, loginUser } from '@/controllers/usersController';

import { Router } from 'express';

const router = Router();

router.post('/user/create', addUser);

router.post('/user/login', loginUser);

export default router;
