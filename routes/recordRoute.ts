import express from 'express';

import {
    showItem
} from '../services/itemServices';

import {
    showMove
} from '../services/moverServices';

import {
    store,
    overFit
} from '../services/recordService';

import {
    createRecordValidator
} from '../validators/recordValidator';

const router:express.Router = express.Router();

router
    .route('/')
    .post(createRecordValidator,showItem,showMove,overFit,store)

export const recordRouter = router;