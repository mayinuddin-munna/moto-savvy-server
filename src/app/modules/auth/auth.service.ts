import bcrypt from 'bcrypt';
import generateToken from '../../utils/generateToken';
import { TUser } from './auth.interface';
import { User } from './auth.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createUserIntoDB = async (res: unknown, user: TUser) => {
  const { email, password } = user;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User with this email number already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    ...user,
    password: hashedPassword,
  });

  const signUpUser = await newUser.save();

  if (signUpUser) {
    // Generate JWT token
    generateToken(res, signUpUser._id.toString());

    // Return the essential data (exclude password)
    const responseData = {
      _id: signUpUser._id,
      name: signUpUser.name,
      phone: signUpUser.phone,
      address: signUpUser.address,
      role: signUpUser.role,
      createdAt: signUpUser.createdAt,
      updatedAt: signUpUser.updatedAt,
    };

    return responseData;
  }

  throw new AppError(httpStatus.UNAUTHORIZED, 'User creation failed');
};

const loginUserIntoDB = async (user: TUser) => {
  const { email, password } = user;

  // Check if user exists
  const isExistsUser = await User.findOne({ email });

  if (isExistsUser && (await bcrypt.compare(password, isExistsUser.password))) {
    const token = generateToken(res, isExistsUser._id.toString());
    // Return the essential data (exclude password)
    const responseData = {
      user: {
        _id: isExistsUser._id,
        name: isExistsUser.name,
        phone: isExistsUser.phone,
        address: isExistsUser.address,
        role: isExistsUser.role,
      },
      token,
    };

    return responseData;
  }
  throw new AppError(httpStatus.UNAUTHORIZED, 'logged in failed!');
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({ id });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
