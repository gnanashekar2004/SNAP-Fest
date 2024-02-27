import express from 'express';
import { createOrganizer, getAllOrganizers, getOrganizerByID, organizeEvent } from '../controls/organizer_controls';

const organizerRouter = express.Router();

organizerRouter.get("/", getAllOrganizers);
organizerRouter.get("/:id", getOrganizerByID);
organizerRouter.post("/", createOrganizer);
organizerRouter.put("/event", organizeEvent);

export default organizerRouter;