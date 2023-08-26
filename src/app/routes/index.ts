import express from 'express';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    routes: AcademicSemesterRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
