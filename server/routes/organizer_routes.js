import express from 'express';
import { createOrganizer, getAllOrganizers, getOrganizerByID } from '../controls/organizer_controls';

const organizerRouter = express.Router();

organizerRouter.get("/", getAllOrganizers);
organizerRouter.get("/:id", getOrganizerByID);
organizerRouter.post("/", createOrganizer);

export default organizerRouter;