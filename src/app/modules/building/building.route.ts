import express from 'express';
import { BuildingController } from './building.controller';
const route = express.Router();

route.post('/create-building', BuildingController.insertToDB);
route.get('/', BuildingController.getAllFromDB);

export const BuildingRouter = route;
