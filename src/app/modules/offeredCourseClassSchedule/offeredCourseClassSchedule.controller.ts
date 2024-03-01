import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseClassScheduleService } from './offeredCourseClassSchedule.service';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseClassScheduleService.insertToDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create offered course Class schedule successfully',
    data: result,
  });
});

export const OfferedCourseClassScheduleController = { insertToDB };
