import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseSectionService } from './offeredCourseSection.service';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.insertToDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create offered course session successfully',
    data: result,
  });
});

export const OfferedCourseSectionController = { insertToDB };
