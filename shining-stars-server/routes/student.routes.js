import express from "express";

import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentDetail,
  updateStudent,
} from "../controllers/student.controller.js";

const router = express.Router();

router.route("/").get(getAllStudents);
router.route("/:id").get(getStudentDetail);
router.route("/").post(createStudent);
router.route("/:id").patch(updateStudent);
router.route("/:id").delete(deleteStudent);

export default router;
