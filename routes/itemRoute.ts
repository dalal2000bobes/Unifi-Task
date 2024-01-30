import express from 'express';

import {
    store
} from'../services/itemServices';

import {
    createItemValidator
} from '../validators/itemValidator';

const router:express.Router = express.Router();

router
    .route('/')
    .post(createItemValidator,store)

export const itemRouter = router;