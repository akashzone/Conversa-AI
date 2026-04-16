import express from "express";
import Thread from "../models/thread.js";
import geminiAPIResponse from "../utils/gemini.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello from chat route!");
});
// Create a new thread
router.post("/threads", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "abc",
      title: "Sample Thread - 2",
    });

    await thread.save();
    console.log("Thread created successfully");
    res.send(thread);
  } catch (err) {
    console.error("Error creating thread:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all threads
router.get("/threads", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    if (!threads) {
      return res.status(404).json({ error: "No threads found" });
    }
    res.send(threads);
  } catch (err) {
    console.error("Error fetching threads:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/threads/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.send(thread);
  } catch (err) {
    console.error("Error fetching thread:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a thread
router.delete("/threads/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deleteThread = await Thread.findOneAndDelete({ threadId });
    if (!deleteThread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.send({ message: "Thread deleted successfully" });
  } catch (err) {
    console.error("Error deleting thread:", err);
    res.status(500).json({ error: err.message });
  }
});
router.post("/chat", async (req, res) => {
  let { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "required fields missing" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      thread = new Thread({
        threadId,
        title: message.substring(0, 20) + "...",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });
    } else {
      if (!thread.messages) {
        thread.messages = [];
      }

      thread.messages.push({
        role: "user",
        content: message,
      });
    }

    const assistantReply = await geminiAPIResponse(message);

    if (!assistantReply) {
      throw new Error("Empty Gemini response");
    }

    thread.messages.push({
      role: "assistant",
      content: assistantReply,
    });

    thread.updatedAt = Date.now();

    await thread.save();

    res.json({ reply: assistantReply });

  } catch (err) {
    console.error("Error fetching thread:", err);
    res.status(500).json({ error: err.message });
  }
});
export default router;
