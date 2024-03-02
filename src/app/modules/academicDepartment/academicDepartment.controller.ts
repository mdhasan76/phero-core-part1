import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AcademicDepartmentService.insertToDB(data);
  sendResponse<AcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department retrieve successfully',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.getDataById(id);
  sendResponse<AcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department retrieve successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, ['searchTerm', 'title']);
  // console.log(req.query);
  const result = await AcademicDepartmentService.getAllFromDB(filters, options);
  sendResponse<AcademicDepartment[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department retrieve successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicDepartmentController = {
  insertToDB,
  getAllFromDB,
  getDataById,
};
