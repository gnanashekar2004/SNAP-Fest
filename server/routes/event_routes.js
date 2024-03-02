import express from 'express';
import { addEvent, deleteEvent, getAllEvents, getEventByID, getEventParticipants, getEventVolunteers, getEventWinners } from '../controls/event_controls';

const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);
eventRouter.get("/volunteers/:id", getEventVolunteers);
eventRouter.get("/winners/:id", getEventWinners);
eventRouter.get("/participants/:id", getEventParticipants);
eventRouter.get("/:id", getEventByID);
eventRouter.delete("/", deleteEvent);
eventRouter.post("/", addEvent);


export default eventRouter;