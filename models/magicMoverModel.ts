import mongoose from 'mongoose';

const moverSchema : mongoose.Schema = new mongoose.Schema(
  {
    weightLimit: {
      type: Number,
      required: [true, 'weight limit required'],
    },
    energy: {
      type: Number,
      required: [true, 'Energy required'],
    },
    questState: {
      type: String,
      enum: ['resting', 'loading', 'on a mission', 'done'],
      default: 'resting',
      required: [true, 'quest state required'],
    },
  },
  { timestamps: true }
);

export const Mover : any = mongoose.model('MagicMover', moverSchema);

