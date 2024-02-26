import express from 'express';
import { getAdminByID, getAllAdmins } from '../controls/admin_controls';

const adminRouter = express.Router();

adminRouter.get("/", getAllAdmins);
adminRouter.get("/:id", getAdminByID);

export default adminRouter;