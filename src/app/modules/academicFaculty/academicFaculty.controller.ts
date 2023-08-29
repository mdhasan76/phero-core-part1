import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AcademicFacultyService.insertToDB(data);
  sendResponse<AcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty retrieve successfully',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getDataById(id);
  sendResponse<AcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty retrieve successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, ['searchTerm', 'title']);
  console.log(req.query);
  const result = await AcademicFacultyService.getAllFromDB(filters, options);
  sendResponse<AcademicFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty retrieve successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicFacultyController = {
  insertToDB,
  getAllFromDB,
  getDataById,
};
