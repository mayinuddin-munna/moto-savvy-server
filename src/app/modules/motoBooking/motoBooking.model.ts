import { Schema, model } from 'mongoose';
import TMotoBooking from './motoBooking.interface';

const MotoBookingSchema: Schema<TMotoBooking> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    ref: 'Bike',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  returnTime: {
    type: Date,
  },
  totalCost: {
    type: Number,
    required: true,
    min: [0, 'Total cost must be positive'],
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
});

export const BookingModel = model<TMotoBooking>('MotoBookingSchema', MotoBookingSchema);
