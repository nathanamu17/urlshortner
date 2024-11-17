const express = require("express");
const {
  handleRedirectUrl,
  handleCreateUrl,
  testApi,
} = require("../Controllers/urlMappingController");

const router = express.Router();

// Route to create a shortened URL
router.post("/generate", handleCreateUrl);

// Test route to check API health
router.get("/health-check", testApi);

// Route to handle redirection using the short code
router.get("/:shortCode", handleRedirectUrl);

module.exports = router;
