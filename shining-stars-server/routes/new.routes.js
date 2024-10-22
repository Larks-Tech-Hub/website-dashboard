import express from "express";

import {
  createNew,
  deleteNew,
  getAllNews,
  getNewDetail,
  updateNew,
} from "../controllers/new.controller.js";

const router = express.Router();

router.route("/").get(getAllNews);
router.route("/:id").get(getNewDetail);
router.route("/").post(createNew);
router.route("/:id").patch(updateNew);
router.route("/:id").delete(deleteNew);

export default router;
