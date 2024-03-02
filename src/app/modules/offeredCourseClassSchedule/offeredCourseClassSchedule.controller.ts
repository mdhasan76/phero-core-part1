import { OfferedCourseClassSchedule } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseClassScheduleRelationalFields } from './offeredCourseClassSchedule.constant';
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

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, OfferedCourseClassScheduleRelationalFields);

  const result = await OfferedCourseClassScheduleService.getAllFromDB(
    filters,
    options
  );
  sendResponse<OfferedCourseClassSchedule[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Offered course class schedule retrieve successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const OfferedCourseClassScheduleController = {
  insertToDB,
  getAllFromDB,
};
