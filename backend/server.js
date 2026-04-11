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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

// app.post("/api/generate", async (req, res) => {
// //   const options = {
// //     headers: {
// //       "Content-Type": "application/json",
// //       "x-goog-api-key": `${process.env.GEMINI_API_KEY}`,
// //     },
// //     method: "POST",
// //     body: JSON.stringify({
// //       model: "gemini-3-flash",
// //       contents:  [
// //       {
// //         "role": "user",
// //         parts: [
// //           {
// //             text: "Explain how AI works in a single paragraph."
// //           }
// //         ]
// //       }
// //     ]}),
// //   };
// //   try {
// //     const response = await fetch(
// //       "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
// //       options
// //     );
// //     const data = await response.json();
// //     // console.log(data);
// //     res.json(data.candidates[0].content.parts[0].text); //reply
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: error.message });
// //   }
// });

