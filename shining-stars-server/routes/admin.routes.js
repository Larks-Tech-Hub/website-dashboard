import express from "express";

import {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdminDetail,
  updateAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.route("/").get(getAllAdmins);
router.route("/:id").get(getAdminDetail);
router.route("/").post(createAdmin);
router.route("/:id").patch(updateAdmin);
router.route("/:id").delete(deleteAdmin);

export default router;
