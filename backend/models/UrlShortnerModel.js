const mongoose = require("mongoose");

//Define the schema for URL mapping
const urlMappingSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Export the model with a new name
module.exports = mongoose.model("UrlMapping", urlMappingSchema);
