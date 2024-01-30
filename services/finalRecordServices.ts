import { FinalRecord } from "../models/finalRecordModel";
import { Record } from "../models/recordModel";
import { Mover } from "../models/magicMoverModel";

import express from 'express';
import asyncHandler from 'express-async-handler';

import {updateState} from './moverServices';
import {
    destroy
} from './recordService';

import { type } from "os";


export const store:express.RequestHandler = asyncHandler(async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {

    console.log(req.body)
    let recordInfo : any  = await new FinalRecord({
        idMover: req.body.idMover,
        weight: req.body.sum,
    });
    const document : any = await recordInfo.save();
    if (!document) {
        res.status(400).json({
            massage: `An Error Catched when Added item`,
            status: 400,
            done: false,
        });
        return
    }
    await updateState("on a mission",req.body.idMover,res);
    await destroy(req.body.idMover,res);
    res.status(201).json({
        data: document,
        status: 201,
        done: true,
    });

});

export const sumWeight : express.RequestHandler = asyncHandler(async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {
    var sum : number = 0 ;

    const document:any = await Record.find({idMover: req.body.idMover});
    if (!document || (document.length == 0)) {
        res.status(404).json({
            massage: "No items founded",
            status: 404,
            done: false,
        });
        return
    }
    console.log(document)
    
    document.forEach((element:any):void => {
        sum = sum + element.totalWeight
    });

    req.body.sum = sum;
    console.log(sum);
    next();

});

export const updateIsDone:express.RequestHandler = asyncHandler(async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {

    let itemID : string = req.body.id

    const document:any = await FinalRecord.findByIdAndUpdate(itemID, {
        state : "done"
    }, {
        new: true,
    });
    if (!document) {
        res.status(404).json({
            massage: `No document for this id ${itemID}`,
            status: 404,
            done: false,
        });
        return
    }
    console.log(document)
    await updateState("done",document.idMover,res);
    res.status(200).json({
        data: document,
        status: 200,
        done: true,
    });
    next();
});

export const listMover:express.RequestHandler = asyncHandler(async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {

    const document:any = await Mover.find();
    if (!document) {
        res.status(404).json({
            massage: "No movers founded",
            status: 404,
            done: false,
        });
        return
    }
    type typeTemp = {
        idMover : string
        allTasks : number
        tasksInProgress : number
        completedTasks : number,
    }
    var result:typeTemp[] = [];
    console.log(document.length)
    document.forEach(async (element : any):Promise<void> => {
        const record1:any = await FinalRecord.find({idMover : element.id});
        const record2:any = await FinalRecord.find({
            idMover : element.id,
            state : "on a mission"});
        const record3:any = await FinalRecord.find({
            idMover : element.id,
            state : "done"});
            var temp:typeTemp = {
                idMover : element.id,
                allTasks : record1.length,
                tasksInProgress : record2.length,
                completedTasks : record3.length,
            };
            result.push(temp);
            if(result.length == document.length){
                console.log(result);
                res.status(200).json({
                    data: result,
                    status: 200,
                    done: true,
                });
            }  
    });
});