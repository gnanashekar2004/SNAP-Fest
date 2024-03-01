import express from 'express';
import { createParticipant, getAcc, getAllParticipants, getParticipantByID, loginExtPart, registerAsParticipant, setAcc } from '../controls/ext_participant_controls';

const ext_participantRouter = express.Router();

ext_participantRouter.get("/", getAllParticipants);
ext_participantRouter.get("/:id", getParticipantByID);
ext_participantRouter.post("/", createParticipant);
ext_participantRouter.put("/register", registerAsParticipant);
ext_participantRouter.get("/accom/:id", getAcc);
ext_participantRouter.post("/accom", setAcc);
ext_participantRouter.put("/login", loginExtPart);

export default ext_participantRouter;