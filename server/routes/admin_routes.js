import express from 'express';
import { declareWinnersByAdmin, deleteExtParticipant, deleteOrganizer, deleteStudent, getAdminByID, getAllAdmins, loginAdmin } from '../controls/admin_controls';

const adminRouter = express.Router();

adminRouter.get("/", getAllAdmins);
adminRouter.get("/:id", getAdminByID);
adminRouter.put("/login", loginAdmin);
adminRouter.post("/organizer", deleteOrganizer);
adminRouter.post("/student", deleteStudent);
adminRouter.post("/ext_part", deleteExtParticipant);
adminRouter.put("/winner", declareWinnersByAdmin);
export default adminRouter;