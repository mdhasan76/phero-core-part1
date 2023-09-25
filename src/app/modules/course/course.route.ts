import express from 'express';
import { CourseController } from './course.controller';
const route = express.Router();

route.post('/create-course', CourseController.insertToDB);
route.get('/', CourseController.getAll);
route.patch('/:id', CourseController.updateOneInDB);

export const CourseRouter = route;
