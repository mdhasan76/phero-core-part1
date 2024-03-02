import express from 'express';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { BuildingRouter } from '../modules/building/building.route';
import { CourseRouter } from '../modules/course/course.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
import { OfferedCourseRoute } from '../modules/offeredCourse/offeredCourse.route';
import { OfferedCourseClassScheduleRoute } from '../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.route';
import { OfferedCourseSessionRoute } from '../modules/offeredCourseSection/offeredCourseSection.route';
import { RoomRoute } from '../modules/room/room.route';
import { SemesterRegistrationRoute } from '../modules/semesterRegistration/semesterRegistration.route';
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
  {
    path: '/courses',
    routes: CourseRouter,
  },
  {
    path: '/faculties',
    routes: facultyRoutes,
  },
  {
    path: '/rooms',
    routes: RoomRoute,
  },
  {
    path: '/semester-registrations',
    routes: SemesterRegistrationRoute,
  },
  {
    path: '/offered-courses',
    routes: OfferedCourseRoute,
  },
  {
    path: '/offered-course-sessions',
    routes: OfferedCourseSessionRoute,
  },
  {
    path: '/offered-course-class-schedules',
    routes: OfferedCourseClassScheduleRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
