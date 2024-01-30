import express from 'express';

import {
    store
} from '../services/moverServices';

import {
    createMoverValidator
} from '../validators/moverValidator';

const router:express.Router = express.Router();

router
    .route('/')
    .post(createMoverValidator,store)

export const moverRouter = router;