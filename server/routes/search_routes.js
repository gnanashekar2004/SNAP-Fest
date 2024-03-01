import express from 'express';
import { getEventByName } from '../controls/search_controls';

const searchRouter = express.Router();

searchRouter.get("/event/:name", getEventByName);

export default searchRouter;