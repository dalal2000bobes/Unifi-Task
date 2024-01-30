import { validationResult } from 'express-validator';
import express from 'express';

// @desc  Finds the validation errors in this request and wraps them in an object with handy functions

export function validatorMiddleware(req:Request, res:express.Response, next:express.NextFunction):express.Response<any, Record<string, any>> | undefined{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

