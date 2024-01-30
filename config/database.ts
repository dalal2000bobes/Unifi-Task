import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export function dbConnection():void {
  mongoose
    .connect(process.env.DB_URI as string)
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`Database Error: ${err}`);
      process.exit(1);
    });
};

