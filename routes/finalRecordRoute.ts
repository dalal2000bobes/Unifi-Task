import express from 'express';

import {
    sumWeight,
    store,
    updateIsDone,
    listMover
} from'../services/finalRecordServices';

import {
    createRecordValidator,
    makeDoneValidaqtor
} from'../validators/finalRecordValidator';

const router:express.Router = express.Router();

router
    .route('/')
    .get(listMover)
    .post(createRecordValidator,sumWeight,store)
    .patch(makeDoneValidaqtor,updateIsDone)

export const finalRecordRouter = router;