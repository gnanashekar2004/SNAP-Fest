import express from 'express';
import { createOrganizer, declareWinners, getAllOrganizers, getEventsOrganized, getOrganizerByID, loginOrg, organizeEvent } from '../controls/organizer_controls';

const organizerRouter = express.Router();

organizerRouter.get("/", getAllOrganizers);
organizerRouter.get("/:id", getOrganizerByID);
organizerRouter.post("/", createOrganizer);
organizerRouter.put("/event", organizeEvent);
organizerRouter.put("/winner", declareWinners);
organizerRouter.put("/login", loginOrg);
organizerRouter.get("/events/:id", getEventsOrganized);

export default organizerRouter;