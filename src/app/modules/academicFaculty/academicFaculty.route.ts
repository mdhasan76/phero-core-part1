import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router
  .post(
    '/create-academic-faculty',
    validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
    AcademicFacultyController.insertToDB
  )
  .get('/', AcademicFacultyController.getAllFromDB)
  .get('/:id', AcademicFacultyController.getDataById);

export const AcademicFacultyRoute = router;
