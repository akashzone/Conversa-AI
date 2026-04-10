import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});