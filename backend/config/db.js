import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aritrabiswas0085_db_user:taskflow2@cluster0.neg8rkt.mongodb.net/taskflow')
    .then (() => console.log("DB connected"));
}