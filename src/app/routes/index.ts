import express from 'express';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { BuildingRouter } from '../modules/building/building.route';
import { studentRoutes } from '../modules/student/student.route';

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
  {
    path: '/academic-departments',
    routes: AcademicDepartmentRoute,
  },
  {
    path: '/students',
    routes: studentRoutes,
  },
  {
    path: '/buildings',
    routes: BuildingRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
