import express from 'express';
import { OfferedCourseController } from './offeredCourse.controller';

const route = express.Router();

route.post('/', OfferedCourseController.insertToDb);

export const OfferedCourseRoute = route;
