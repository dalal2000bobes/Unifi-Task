import { Item } from "../models/magicItemModel";

import express from 'express';
import asyncHandler from 'express-async-handler';

export const showItem:express.RequestHandler = asyncHandler(async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {

    let idItem:string = req.body.idItem
    const document:any = await Item.findById(idItem);
    if (!document) {
        res.status(404).json({
            massage: `No document for this id ${idItem}`,
            status: 404,
            done: false,
        });
        return
    }
    req.body.item = document;
    console.log(req.body)
    next();
});


export const store:express.RequestHandler = asyncHandler(async (req:express.Request, res:express.Response, next:express.NextFunction):Promise<any> => {

    let itemInfo:any = await new Item({
        name: req.body.name,
        weight: req.body.weight,
    });
    const document:any = await itemInfo.save();
    if (!document) {
        res.status(400).json({
            massage: `An Error Catched when Added item ${req.body.name}`,
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
