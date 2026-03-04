// /api/tickets.js
import redis from "../redisClient.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { seatId, userId } = req.body;

    if (!seatId || !userId) {
      return res.status(400).json({ message: "seatId and userId are required" });
    }

    const key = `seat:${seatId}`;
    const ttl = 30; // lock expires in 30 seconds

    try {
      // NX = only set if not exists, EX = TTL
      const locked = await redis.set(key, userId, "EX", ttl, "NX");

      if (!locked) {
        return res.status(409).json({ message: "Seat already locked" });
      }

      return res.status(200).json({ message: "Seat locked successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}