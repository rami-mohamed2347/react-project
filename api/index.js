import express from "express";

import dotenv from "dotenv";
const app = express();

dotenv.config();
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dqucgdtqf",
  api_key: "978261479271917",
  api_secret: "A7I5DyxZK-XYGf89pGnMFDsxe1I",
});

// Import other route handlers
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";

import cookieParser from "cookie-parser";
import multer from "multer";

import cors from "cors";

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

// Modify storage configuration to not save files locally
// const upload = multer(); // Multer without storage

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Send the Cloudinary URL of the uploaded image in the response
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Mount other route handlers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);

// Start the server
app.listen(8800, () => {
  console.log("API working");
});
