import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AcademicSemesterService.insertToDB(data);
  sendResponse<AcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Academicsemester retrive successfully',
    data: result,
  });
});

export const AcademicSemesterController = { insertToDB };
