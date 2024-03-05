import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const route = express.Router();

route.post(
  '/start-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.startMyRegistration
);
route.post(
  '/enroll',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.enrollIntoCourse
);
route.post(
  '/withdraw',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.withdrawFromCourse
);
route
  .post(
    '/create-semester-registration',
    SemesterRegistrationController.insertToDB
  )
  .get('/', SemesterRegistrationController.getAll);

export const SemesterRegistrationRoute = route;
