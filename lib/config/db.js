import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Hemanth:Hemanth123@cluster0.i6kkoac.mongodb.net/todo-app"
  );
  console.log("DB Connected");
};
