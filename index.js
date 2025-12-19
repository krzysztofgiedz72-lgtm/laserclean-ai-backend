const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// ROOT – TO NAPRAWIA "Cannot GET /"
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "LaserClean AI Backend",
    time: new Date().toISOString()
  });
});

// HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ health: "green" });
});

app.listen(PORT, () => {
  console.log(`LaserClean AI backend running on port ${PORT}`);
});