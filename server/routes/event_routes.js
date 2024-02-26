import express from 'express';
import { getAllEvents, getEventByID } from '../controls/event_controls';

const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getEventByID);

export default eventRouter;