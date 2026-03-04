import express from "express";
import redisClient from "../redisClient.js";

const router = express.Router();

// Lock a seat
router.post("/lock", async (req, res) => {
  const { seatId, userId } = req.body;
  const lockKey = `seat:${seatId}`;
  const ttl = 30; // seconds

  try {
    const result = await redisClient.set(lockKey, userId, { NX: true, EX: ttl });
    if (!result) return res.status(409).json({ message: "Seat already locked" });
    res.json({ message: "Seat locked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Unlock a seat
router.post("/unlock", async (req, res) => {
  const { seatId, userId } = req.body;
  const lockKey = `seat:${seatId}`;

  try {
    const owner = await redisClient.get(lockKey);
    if (owner === userId) {
      await redisClient.del(lockKey);
      return res.json({ message: "Seat unlocked" });
    }
    res.status(403).json({ message: "Cannot unlock seat you don't own" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get seat statuses
router.get("/status", async (req, res) => {
  try {
    const seats = {};
    for (let i = 1; i <= 20; i++) {
      const key = `seat:A${i}`;
      const owner = await redisClient.get(key);
      seats[`A${i}`] = owner ? "locked" : "available";
    }
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;