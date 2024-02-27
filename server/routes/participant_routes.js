import express from 'express';
import { createParticipant, getAllParticipants, getParticipantByID, registerAsParticipant } from '../controls/participant_controls';

const participantRouter = express.Router();

participantRouter.get("/", getAllParticipants);
participantRouter.get("/:id", getParticipantByID);
participantRouter.post("/", createParticipant);
participantRouter.put("/register", registerAsParticipant);
export default participantRouter;