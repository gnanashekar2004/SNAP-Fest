import express from "express";
import { getAllColleges, getCollegeByID, insertCollege } from "../controls/college_controls";

const college_router = express.Router();

college_router.get("/", getAllColleges);
college_router.post("/", insertCollege);
college_router.get("/:id", getCollegeByID);

export default college_router;