import express from 'express';
import { getAllStudents, getStudentByID, registerAsVolunteer, registerForEvent } from '../controls/student_controls';

const studentRouter = express.Router();

studentRouter.get("/", getAllStudents);

studentRouter.get("/:id", getStudentByID);
studentRouter.put("/volunteer", registerAsVolunteer);
studentRouter.put("/register", registerForEvent);

export default studentRouter;