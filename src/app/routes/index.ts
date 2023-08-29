import express from 'express';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    routes: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculties',
    routes: AcademicFacultyRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
