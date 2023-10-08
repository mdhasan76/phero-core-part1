import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CourseService } from './course.service';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await CourseService.insertToDB(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course Created successfully',
    data: result,
  });
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getAll();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieve all Course successfully',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await CourseService.updateOneInDB(req.params.id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const assignFaculties = catchAsync(async (req: Request, res: Response) => {
  const data = req.body.faculties;
  const result = await CourseService.assignFaculties(req.params.id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Assign faculty in course successfully',
    data: result,
  });
});
const removeFaculties = catchAsync(async (req: Request, res: Response) => {
  const data = req.body.faculties;
  const result = await CourseService.removeFaculties(req.params.id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'delete course from course faculty successfully',
    data: result,
  });
});

export const CourseController = {
  insertToDB,
  getAll,
  updateOneInDB,
  assignFaculties,
  removeFaculties,
};
