import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BuildingService } from './building.service';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await BuildingService.insertToDB(data);
  sendResponse<Building[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academicsemester retrieve successfully',
    data: result,
  });
});

export const BuildingController = { insertToDB };
