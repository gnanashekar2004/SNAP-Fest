import express from 'express';
import { getAllHalls, getHall } from '../controls/hall_controls';

const hallRouter = express.Router();

hallRouter.get("/", getAllHalls);
hallRouter.get("/accom/:id", getHall);

export default hallRouter;