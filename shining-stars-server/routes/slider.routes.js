import express from "express";

import {
  createSlider,
  deleteSlider,
  getAllSliders,
  getSliderDetail,
  updateSlider,
} from "../controllers/slider.controller.js";

const router = express.Router();

router.route("/").get(getAllSliders);
router.route("/:id").get(getSliderDetail);
router.route("/").post(createSlider);
router.route("/:id").patch(updateSlider);
router.route("/:id").delete(deleteSlider);

export default router;
