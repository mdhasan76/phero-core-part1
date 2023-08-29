import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
const router = express.Router();

router
  .post(
    '/create-academic-department',
    validateRequest(
      AcademicDepartmentValidation.academicDepartmentValidationSchema
    ),
    AcademicDepartmentController.insertToDB
  )
  .get('/', AcademicDepartmentController.getAllFromDB)
  .get('/:id', AcademicDepartmentController.getDataById);

export const DepartmentDepartmentRoute = router;
