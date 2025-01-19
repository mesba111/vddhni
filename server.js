// backend a install korer jonno
// 1. npm init -y
// 2. npm install express ytdl-core cors
// 3. npm install
// 4. npm install ytdl-core
//server set check--> node server.js


const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// API Endpoint for video download
app.get("/download", async (req, res) => {
  const videoURL = req.query.url;

  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).send("Invalid YouTube URL!");
  }

  try {
    res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
    ytdl(videoURL, { format: "mp4" }).pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).send("Failed to download the video!");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
