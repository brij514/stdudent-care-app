import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth_routes.js";
import attendanceRoutes from "./routes/attendance_routes.js";
import marksRoutes from "./routes/marks_routes.js";
import notesRoutes from "./routes/notes_routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/notes", notesRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
