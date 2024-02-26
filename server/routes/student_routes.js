import express from 'express';
import { getAllStudents, getStudentByID, insertStudent } from '../controls/student_controls';

const studentRouter = express.Router();

studentRouter.get("/", getAllStudents);
//studentRouter.post("/", insertStudent);
studentRouter.get("/:id", getStudentByID);

export default studentRouter;