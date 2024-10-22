import express from "express";

import {
  createStaff,
  deleteStaff,
  getAllStaffs,
  getStaffDetail,
  updateStaff,
} from "../controllers/staff.controller.js";

const router = express.Router();

router.route("/").get(getAllStaffs);
router.route("/:id").get(getStaffDetail);
router.route("/").post(createStaff);
router.route("/:id").patch(updateStaff);
router.route("/:id").delete(deleteStaff);

export default router;
