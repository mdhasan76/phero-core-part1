import express from 'express';
import { BuildingController } from './building.controller';
const route = express.Router();

route.post('/create-building', BuildingController.insertToDB);

export const BuildingRouter = route;
