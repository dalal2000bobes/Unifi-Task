import mongoose from 'mongoose';

const itemSchema : mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name required'],
    },
    weight: {
        type: Number,
        required: [true, 'weight required'],
      },
  },
  { timestamps: true }
);


export const Item : any = mongoose.model('MagicItem', itemSchema);

