import express from 'express';
import { DeregisterForEvent, getAllParts, getEventsParticipated, registerForEvent } from '../controls/part_controls';

const partRouter = express.Router();

partRouter.put("/", registerForEvent);
partRouter.get("/", getAllParts);
partRouter.get("/events/:id", getEventsParticipated);
partRouter.delete("/deregister", DeregisterForEvent);

export default partRouter;