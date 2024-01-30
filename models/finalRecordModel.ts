import mongoose from 'mongoose';

const finalRecordSchema : mongoose.Schema = new mongoose.Schema(
  {
    idMover: {
      type : mongoose.Schema.Types.ObjectId ,
      required: [true, 'id mover required'],
    },

    weight : {
        type : Number,
        required: [true, 'id item required'],
    },
    
    state: {
        type: String,
        enum: ['on a mission', 'done'],
        default: 'on a mission',
        required: [true, 'state required'],
      },
  },
  { timestamps: true }
);


export const FinalRecord : any = mongoose.model('FinalRecord', finalRecordSchema);


