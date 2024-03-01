import express from 'express';
import { DeregisterAsVolunteer, getAllStudents, getStudentByID, loginStudent, registerAsVolunteer} from '../controls/student_controls';

const studentRouter = express.Router();

studentRouter.get("/", getAllStudents);

studentRouter.get("/:id", getStudentByID);
studentRouter.put("/volunteer", registerAsVolunteer);
studentRouter.delete("/volunteer", DeregisterAsVolunteer);
studentRouter.put("/login", loginStudent);
// studentRouter.put("/register", registerForEvent);

export default studentRouter;