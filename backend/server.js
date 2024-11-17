const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors"); // Middleware for handling Cross-Origin Resource Sharing
const urlMappingRouter = require("./Routes/urlMappingRoute"); // Updated route import

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Connect to the MongoDB database
mongoose
  .connect("mongodb://127.0.0.1:27017/")
  .then(() => {
    const PORT = 3060;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

// Use the router for handling URL mappings
app.use("/", urlMappingRouter);

