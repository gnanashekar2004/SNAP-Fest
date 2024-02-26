import express from 'express';
import { createParticipant, getAllParticipants, getParticipantByID } from '../controls/participant_controls';

const participantRouter = express.Router();

participantRouter.get("/", getAllParticipants);
participantRouter.get("/:id", getParticipantByID);
participantRouter.post("/", createParticipant);

export default participantRouter;