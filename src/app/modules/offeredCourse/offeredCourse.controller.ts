import { OfferedCourse } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseService } from './offeredCourse.service';

const insertToDb = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await OfferedCourseService.insertToDB(data);
  sendResponse<OfferedCourse[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});

export const OfferedCourseController = { insertToDb };
