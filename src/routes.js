const express = require("express");
const router = express.Router();
const redisClient = require("./redisClient");

const TOTAL_SEATS = 10;

router.post("/book", async (req, res) => {
  let seats = await redisClient.get("seats");

  if (!seats) {
    await redisClient.set("seats", TOTAL_SEATS);
    seats = TOTAL_SEATS;
  }

  if (seats <= 0) {
    return res.status(400).json({ message: "No seats available" });
  }

  await redisClient.decr("seats");

  res.json({
    message: "Seat booked successfully",
    remainingSeats: seats - 1
  });
});

module.exports = router;