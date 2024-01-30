import { Record } from "../models/recordModel";
import express from 'express';
import asyncHandler from 'express-async-handler';

import {updateState} from './moverServices'


export const store:express.RequestHandler = asyncHandler(async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {
    if(req.body.mover.questState == "on a mission"){
        res.status(200).json({
            massage: `Ooops , the mover is on a mission , choose another mover`,
            status: 200,
            done: false,
        });
        return
    }
    console.log(req.body)
    let recordInfo:any = await new Record({
        idMover: req.body.idMover,
        idItem: req.body.idItem,
        totalWeight : req.body.item.weight * req.body.num,
        num : req.body.num
    });
    const document:any = await recordInfo.save();
    if (!document) {
        res.status(400).json({
            massage: `An Error Catched when Added item`,
            status: 400,
            done: false,
        });
        return
    }
    await updateState("loading",req.body.idMover,res);
    res.status(201).json({
        data: document,
        status: 201,
        done: true,
    });

});

export const overFit:express.RequestHandler = asyncHandler(async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {

    const document:any = await Record.find({idMover: req.body.idMover,});
    var sum:number = 0 ;
    if (!document) {
        res.status(404).json({
            massage: "No items founded",
            status: 404,
            done: false,
        });
        return
    }
    if((req.body.item.weight * req.body.num) > (req.body.mover.weightLimit)){
        res.status(200).json({
            massage: `please , stop loading more `,
            overload : (req.body.item.weight * req.body.num) - (req.body.mover.weightLimit),
            status: 200,
            done: false,
        });
        return
    }
    document.forEach((element:any):void => {
            sum = sum + element.totalWeight;
    });
    if(sum > req.body.weightLimit){
        res.status(200).json({
            massage: `please , stop loading more `,
            overload : sum - req.body.weightLimit,
            status: 200,
            done: false,
        });
        return
    }
    if((sum + (req.body.item.weight*req.body.num)) > (req.body.mover.weightLimit)){
        res.status(200).json({
            massage: `please , stop loading more `,
            overload : (sum + (req.body.item.weight*req.body.num)) - (req.body.mover.weightLimit),
            status: 200,
            done: false,
        });
        return
    }
    next();

});



export const destroy = async (id:string, res:express.Response):Promise<any> => {

    const document = await Record.deleteMany({idMover : id});
    if (!document) {
        res.status(404).json({
            massage: `No document for this id ${id}`,
            status: 404,
            done: false,
        });
        return
    }
};