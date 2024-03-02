import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const route = express.Router();

route
  .post(
    '/create-semester-registration',
    SemesterRegistrationController.insertToDB
  )
  .get('/', SemesterRegistrationController.getAll);

export const SemesterRegistrationRoute = route;
