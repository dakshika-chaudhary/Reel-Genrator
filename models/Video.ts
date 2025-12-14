import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },

  videoId: {
    type: String,
    required: true,
    unique: true
  },

  videoUrl: String,
  audioUrl: String,

  images: [String],
  captions: [String],

  topic: String,

  style: {
    type: String,
    default: "realistic"
  },

  duration: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Prevent model re-compilation in dev
export default mongoose.models.Video ||
  mongoose.model("Video", VideoSchema);
