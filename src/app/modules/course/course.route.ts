import express from 'express';
import { CourseController } from './course.controller';
const route = express.Router();

route.post('/create-course', CourseController.insertToDB);
route.post('/', CourseController.getAll);

export const CourseRouter = route;
