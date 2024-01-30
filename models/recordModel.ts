import mongoose from 'mongoose';

const recordSchema : mongoose.Schema = new mongoose.Schema(
  {
    idMover: {
      type : mongoose.Schema.Types.ObjectId ,
      required: [true, 'id mover required'],
    },
    
    idItem : {
        type : mongoose.Schema.Types.ObjectId ,
        required: [true, 'id item required'],
    },

    totalWeight: Number,

    num : {
        type : Number,
        required: [true, 'id item required'],
    },
    
    state: {
        type: Boolean,
        default: false,
        required: [true, 'state required'],
      },
  },
  { timestamps: true }
);


export const Record : any = mongoose.model('Record', recordSchema);

