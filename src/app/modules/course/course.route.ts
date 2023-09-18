import express from 'express';
import { CourseController } from './course.controller';
const route = express.Router();

route.post('/create-course', CourseController.insertToDB);

export const CourseRouter = route;
