import express from 'express';
import { getAllEvents, getEventByID, getEventVolunteers, getEventWinners } from '../controls/event_controls';

const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);
eventRouter.get("/volunteers/:id", getEventVolunteers);
eventRouter.get("/winners/:id", getEventWinners);

eventRouter.get("/:id", getEventByID);



export default eventRouter;