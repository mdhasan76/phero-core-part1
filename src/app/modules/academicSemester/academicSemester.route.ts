import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemsterValidaton } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemsterValidaton.academicSemesterValidationSchema),
  AcademicSemesterController.insertToDB
);

export const AcademicSemesterRoute = router;
