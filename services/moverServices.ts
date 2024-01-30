import { Mover } from "../models/magicMoverModel";

import express from 'express';
import asyncHandler from 'express-async-handler';


export const showMove:express.RequestHandler = asyncHandler(async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {

    let moverID:string = req.body.idMover
    const document:any = await Mover.findById(moverID);
    if (!document) {
        res.status(404).json({
            massage: `No document for this id ${moverID}`,
            status: 404,
            done: false,
        });
        return
    }
    req.body.mover = document;
    console.log(req.body)
    next();

});


export const store:express.RequestHandler = asyncHandler(async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {

    let moverInfo:any = await new Mover({
        weightLimit: req.body.weightLimit,
        energy: req.body.energy,
        questState: req.body.questState,
    });
    const document:any = await moverInfo.save();
    if (!document) {
        res.status(400).json({
            massage: `An Error Catched when Added mover`,
            status: 400,
            done: false,
        });
        return
    }
    res.status(201).json({
        data: document,
        status: 201,
        done: true,
    });

});

export  async function updateState(stateMover:string,moverID:string,res:express.Response):Promise<any> {


    const document:any = await Mover.findByIdAndUpdate(moverID, {
        questState: stateMover,
    }, {
        new: true,
    });
    if (!document) {
        res.status(404).json({
            massage: `No document for this id ${moverID}`,
            status: 404,
            done: false,
        });
        return
    }
    return
};