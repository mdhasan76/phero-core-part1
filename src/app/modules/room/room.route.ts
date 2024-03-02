import express from 'express';
import { RoomController } from './room.controller';

const route = express.Router();

route.post('/', RoomController.insertToDB);

export const RoomRoute = route;
