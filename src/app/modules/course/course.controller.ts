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

export const CourseController = { insertToDB };
