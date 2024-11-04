import { Request, Response } from 'express';
import { MotoBikeServices } from './motoBike.service';
import bikeValidationSchema from './motoBike.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    // Data validation using zod
    const zodParseData = bikeValidationSchema.parse(product);

    const result = await MotoBikeServices.createProductIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Product is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await MotoBikeServices.updateProductIntoDB(
      productId,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'Product is update successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await MotoBikeServices.deleteProductIntoDB(productId);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'fail',
        error: "Couldn't delete the product",
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product is delete successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query as { searchTerm?: string };
    const result = await MotoBikeServices.getAllProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Product are retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await MotoBikeServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product is retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
};
