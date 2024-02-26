import express from 'express';
import { getAllStudents, getStudentByID } from '../controls/student_controls';

const studentRouter = express.Router();

studentRouter.get("/", getAllStudents);

studentRouter.get("/:id", getStudentByID);

export default studentRouter;