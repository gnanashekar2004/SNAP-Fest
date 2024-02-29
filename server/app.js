import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// import college_router from './routes/college_routes';
import studentRouter from './routes/student_routes';
import eventRouter from './routes/event_routes';
import adminRouter from './routes/admin_routes';
import ext_participantRouter from './routes/ext_participant_routes';
import organizerRouter from './routes/organizer_routes';
import partRouter from './routes/part_routes';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", (req, res, next)=>{
	res.status(200).send("Hello Wrold!! Checking my error :)");
});

// routes
// app.use("/colleges", college_router);
app.use("/students", studentRouter);
app.use("/events", eventRouter);
app.use("/admins", adminRouter);
app.use("/ext_part", ext_participantRouter);
app.use("/parts", partRouter);
app.use("/orgs", organizerRouter);

// running sever
const port = process.env.PORT || 5001;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});




// https://docs.google.com/document/d/1GxPX5JQhGnsjrkUfXCqcv-LtcVjXgWH-AKGj0-ROzOE/edit?usp=sharing