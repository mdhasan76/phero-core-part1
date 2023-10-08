import express from 'express';
import { CourseController } from './course.controller';
const route = express.Router();

route.post('/create-course', CourseController.insertToDB);
route.get('/', CourseController.getAll);
route.patch('/:id', CourseController.updateOneInDB);
route.post('/:id/assign-faculties', CourseController.assignFaculties);
route.delete('/:id/remove-faculties', CourseController.removeFaculties);

export const CourseRouter = route;
