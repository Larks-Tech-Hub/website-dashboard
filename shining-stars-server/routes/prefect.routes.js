import express from "express";

import {
  createPrefect,
  deletePrefect,
  getAllPrefects,
  getPrefectDetail,
  updatePrefect,
} from "../controllers/prefect.controller.js";

const router = express.Router();

router.route("/").get(getAllPrefects);
router.route("/:id").get(getPrefectDetail);
router.route("/").post(createPrefect);
router.route("/:id").patch(updatePrefect);
router.route("/:id").delete(deletePrefect);

export default router;
