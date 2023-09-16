import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BuildingService } from './building.service';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await BuildingService.insertToDB(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academicsemester retrieve successfully',
    data: result,
  });
});

// get all data from db
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.getAllFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Building retrieve successfully',
    data: result,
  });
});

export const BuildingController = { insertToDB, getAllFromDB };
