import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RoomService } from './room.service';

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.insertToDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create Room successfully',
    data: result,
  });
});

export const RoomController = { insertToDB };
