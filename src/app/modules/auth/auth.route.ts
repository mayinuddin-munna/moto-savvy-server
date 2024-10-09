import express from 'express';
import { UserControllers } from './auth.controller';
import { protect } from '../../middlewares/authMiddleware';
// import validateRequest from '../../middlewares/validateRequest';
// import { UserValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/create-user',
  // validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login-user',
  // validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.loginUser,
);

router.post('/logout-user', protect, UserControllers.logoutUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

export const UserRoutes = router;
