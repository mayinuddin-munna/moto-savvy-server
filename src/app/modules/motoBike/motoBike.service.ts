import { TMotoBike } from './motoBike.interface';
import { BikeModel } from './motoBike.model';

const createProductIntoDB = async (products: TMotoBike) => {
  const result = await BikeModel.create(products);
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  let result;
  if (searchTerm) {
    result = await BikeModel.find({ name: new RegExp(searchTerm, 'i') });
  } else {
    result = await BikeModel.find();
  }
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await BikeModel.findOne({ _id });
  return result;
};

const updateProductIntoDB = async (_id: string, updateData: TMotoBike) => {
  const result = await BikeModel.updateOne({ _id }, { $set: updateData });
  return result;
};

const deleteProductIntoDB = async (_id: string) => {
  const result = await BikeModel.deleteOne({ _id });
  return result;
};

export const MotoBikeServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
