import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
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

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getDataById(id);
  sendResponse<AcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Academicsemester retrive successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, [
    'searchTerm',
    'title',
    'code',
    'startMonth',
    'endMonth',
  ]);
  console.log(req.query);
  const result = await AcademicSemesterService.getAllFromDB(filters, options);
  sendResponse<AcademicSemester[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academicsemester retrive successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicSemesterController = {
  insertToDB,
  getAllFromDB,
  getDataById,
};
