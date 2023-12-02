import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.insertToDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Created Semester Registration successfully',
    data: result,
  });
});

export const SemesterRegistrationController = { insertToDB };
