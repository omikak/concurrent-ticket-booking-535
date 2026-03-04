import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import ticketRoutes from "./routes/tickets.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/tickets", ticketRoutes);

// Fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));