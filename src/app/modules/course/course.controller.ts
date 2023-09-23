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

export const CourseController = { insertToDB, getAll };
