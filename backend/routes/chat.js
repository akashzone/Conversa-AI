import express from "express";
import Thread from "../models/thread.js";


const router = express.Router();

router.get("/", async (req, res) => {
    res.send("Hello from chat route!");
});
// Create a new thread
router.post("/threads",async (req,res)=>{
    try{
        const thread = new Thread({
            threadId: "xyz",
            title: "Sample Thread",
        });

        await thread.save();
        console.log("Thread created successfully");
        res.send(thread);
    }catch(err){
        console.error("Error creating thread:", err);
        res.status(500).json({ error: err.message });
    }
})


export default router;