import { Types } from 'mongoose';

interface TMotoBooking {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime?: Date;
  totalCost: number;
  isReturned: boolean;
}

export default TMotoBooking;
