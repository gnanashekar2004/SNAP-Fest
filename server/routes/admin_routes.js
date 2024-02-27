import express from 'express';
import { deleteOrganizer, deleteParticipant, deleteStudentFromParticipant, deleteStudentFromVolunteer, getAdminByID, getAllAdmins } from '../controls/admin_controls';

const adminRouter = express.Router();

adminRouter.get("/", getAllAdmins);
adminRouter.get("/:id", getAdminByID);
adminRouter.delete("/organizer", deleteOrganizer);
adminRouter.delete("/participant", deleteParticipant);
adminRouter.delete("/studentFromParticipant", deleteStudentFromParticipant);
adminRouter.delete("/studentFromvolunteer", deleteStudentFromVolunteer);

export default adminRouter;