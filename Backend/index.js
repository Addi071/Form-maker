
import express from 'express';
import connectDB from './db/connection.js';
import cors from "cors"
import userRoutes from './Routes/user.Route.js';
import Route from "./Routes/survey.Route.js"
import responseRoutes from "./Routes/response.route.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors())

// DB connect
connectDB();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/survey', Route);
app.use("/api/responses", responseRoutes);
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

let port = process.env.PORT || 6060;
app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
