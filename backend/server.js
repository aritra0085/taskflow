import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB CONNECTION
connectDB();

// ROUTES

app.use("/api/user",userRouter);
app.use("/api/tasks",taskRouter);

app.get('/', (req, res) => {
  res.send('API is running....');
});

// SERVER START
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});


// backend done