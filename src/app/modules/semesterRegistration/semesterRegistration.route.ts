import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const route = express.Router();

route.post(
  '/create-semester-registration',
  SemesterRegistrationController.insertToDB
);

export const SemesterRegistrationRoute = route;
