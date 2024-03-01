import express from 'express';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const route = express.Router();

route.post('/', OfferedCourseClassScheduleController.insertToDB);

export const OfferedCourseClassScheduleRoute = route;
