import express from 'express';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';

const route = express.Router();

route.post('/', OfferedCourseSectionController.insertToDB);

export const OfferedCourseSessionRoute = route;
