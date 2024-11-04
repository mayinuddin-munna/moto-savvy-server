import { Schema, model } from 'mongoose';
import { TMotoBike } from './motoBike.interface';

const MotoBikeSchema: Schema<TMotoBike> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    cc: { type: Number, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
  },
  { timestamps: true },
);

export const BikeModel = model<TMotoBike>('MotoBookSchema', MotoBikeSchema);
