import mongoose from 'mongoose';
import { TUser } from './auth.interface';

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
        },
        message:
          'Password must contain at least one lowercase, one uppercase, and one digit',
      },
    },
    phone: {
      type: String,
      required: false,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<TUser>('User', UserModel);
