import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';


import {itemRouter} from './routes/itemRoute';
import {moverRouter} from './routes/moverRoute';
import {recordRouter} from './routes/recordRoute';
import {finalRecordRouter} from './routes/finalRecordRoute';

import { dbConnection } from './config/database';
dbConnection();

export var app:express.Application = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/items', itemRouter);
app.use('/movers', moverRouter);
app.use('/records', recordRouter);
app.use('/final/records', finalRecordRouter);



app.use(function(req:express.Request, res:express.Response, next:express.NextFunction) {
  next(createError(404));
});


app.use(function(err:any, req:express.Request, res:express.Response, next:express.NextFunction):void {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send({error : err.message});
});

