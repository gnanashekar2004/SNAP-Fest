import express from 'express';
import { createOrganizer, declareWinners, deorganizeEvent, getAllOrganizers, getAllWaitingOrgs, getEventsOrganized, getOrganizerByID, loginOrg, organizeEvent } from '../controls/organizer_controls';

const organizerRouter = express.Router();

organizerRouter.get("/", getAllOrganizers);
organizerRouter.get("/:id", getOrganizerByID);
organizerRouter.post("/", createOrganizer);
organizerRouter.put("/event", organizeEvent);
organizerRouter.post("/event", deorganizeEvent);
organizerRouter.put("/winner", declareWinners);
organizerRouter.put("/login", loginOrg);
organizerRouter.get("/events/:id", getEventsOrganized);
organizerRouter.get("/waiting/users", getAllWaitingOrgs);

export default organizerRouter;