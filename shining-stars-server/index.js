import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";

import userRouter from "./routes/user.routes.js";
import studentRouter from "./routes/student.routes.js";
import adminRouter from "./routes/admin.routes.js";
import admissionRouter from "./routes/admission.routes.js";
import eventRouter from "./routes/event.routes.js";
import newsRouter from "./routes/new.routes.js";
import prefectRouter from "./routes/prefect.routes.js";
import sliderRouter from "./routes/slider.routes.js";
import staffRouter from "./routes/staff.routes.js";
import contactRouter from "./routes/contact.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "Shining Star Server is running fine !" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/admissions", admissionRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/prefects", prefectRouter);
app.use("/api/v1/sliders", sliderRouter);
app.use("/api/v1/staffs", staffRouter);
app.use("/api/v1/contact", contactRouter);


const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () =>
      console.log("Server started on port http://localhost:8080"),
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
