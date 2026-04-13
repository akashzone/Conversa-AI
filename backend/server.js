import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}

app.use(cors());
app.use(express.json());
app.use("/api/", chatRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});