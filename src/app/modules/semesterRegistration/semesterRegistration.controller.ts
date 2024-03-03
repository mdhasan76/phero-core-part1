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

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.getAll();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration retrieved successfully',
    data: result,
  });
});

const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.startMyRegistration(
    req.user?.userId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Registration successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  insertToDB,
  getAll,
  startMyRegistration,
};
