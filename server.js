// server.js
import express from "express";
import ticketRoutes from "./routes/tickets.js";

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// API routes
app.use("/api", ticketRoutes);

// Health check route (optional but helpful)
app.get("/", (req, res) => {
  res.send("Concurrent Ticket Booking API is running!");
});

// Use the Vercel-provided port or fallback to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));