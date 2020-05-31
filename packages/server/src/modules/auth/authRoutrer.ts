import express from 'express';
import * as controller from './authController';

export const authRouter = express.Router();

authRouter.get('/register', controller.register);
