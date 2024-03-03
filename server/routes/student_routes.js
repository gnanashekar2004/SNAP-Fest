import express from 'express';
import { DeregisterAsVolunteer, createStudent, getAllStudents, getEventsVolunteered, getStudentByID, loginStudent, registerAsVolunteer} from '../controls/student_controls';

const studentRouter = express.Router();

studentRouter.get("/", getAllStudents);
studentRouter.post("/", createStudent);
studentRouter.get("/:id", getStudentByID);
studentRouter.put("/volunteer/register", registerAsVolunteer);
studentRouter.get("/volunteer/:id", getEventsVolunteered);
studentRouter.post("/volunteer/delete", DeregisterAsVolunteer);
studentRouter.put("/login", loginStudent);
// studentRouter.put("/register", registerForEvent);

export default studentRouter;