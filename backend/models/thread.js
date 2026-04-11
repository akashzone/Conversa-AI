import mongoose from "mongoose";

//Basically, we define only one schema inside a model, but here we create
//a messaage schema which doesn't have any other operations seperately so we are
//using it inside the thread schema as an array of messages.
const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const threadSchema = new mongoose.Schema({
    threadId :{
        type: String,
        required: true,
        unique: true,
    },
    title:{
        type: String,
        required: true,
    },
    messages: [messageSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


const Thread = mongoose.model("Thread", threadSchema);

export default Thread;