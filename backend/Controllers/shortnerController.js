const UrlMapping = require("../models/UrlShortnerModel");

// Function to generate a unique short code
function createUniqueCode() {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset.charAt(randomIndex);
  }
  return code;
}

// Controller to handle creating a shortened URL
const handleCreateUrl = async (req, res) => {
  try {
    let { shortCode } = req.body;

    // Generate a random code if not provided
    if (!shortCode) {
      shortCode = createUniqueCode();
    }

    // Check if the short code already exists
    const existingMapping = await UrlMapping.findOne({ shortUrl: shortCode });

    if (!existingMapping) {
      const { originalUrl } = req.body;

      // Save the new URL mapping
      const newMapping = await UrlMapping.create({
        longUrl: originalUrl,
        shortUrl: shortCode,
      });
      return res.status(200).json(newMapping);
    }

    // Respond with a conflict error if the short code exists
    return res.status(409).json({ error: "Short code already exists" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Controller to handle redirection from short URL to original URL
const handleRedirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Find the original URL associated with the short code
    const urlMapping = await UrlMapping.findOne({ shortUrl: shortCode });

    if (!urlMapping) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.status(302).redirect(urlMapping.longUrl);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Test route to ensure API functionality
const testApi = async (req, res) => {
  try {
    return res.status(200).json({ message: "API is working correctly" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  testApi,
  createUniqueCode,
  handleCreateUrl,
  handleRedirectUrl,
};