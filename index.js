import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "LaserClean AI backend",
    time: new Date().toISOString()
  });
});

app.get("/api/health", (req, res) => {
  res.json({ health: "green" });
});

app.listen(PORT, () => {
  console.log(`LaserClean AI backend running on port ${PORT}`);
});