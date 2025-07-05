const shortid = require("shortid");
const URL = require("../models/url");
const validator = require("validator");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  if (!validator.isURL(body.url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

module.exports = { handleGenerateNewShortURL };
