const natural = require("natural");
const express = require("express");
const app = express();

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

const tests = [
  { input: "I am fine" },
  { input: "I hate this tutorial" },
  { input: "This is an average tutorial" },
  { input: "This is the best tutorial ever" },
  { input: "This is the worst tutorial ever" },
];

function interpretSentiment(score) {
  if (score > 0.5) return "Strongly Positive";
  if (score > 0) return "Positive";
  if (score === 0) return "Neutral";
  if (score > -0.5) return "Negative";
  return "Strongly Negative";
}

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/ai", (req, res) => {
  if (!req.query.text) {
    res.send("Please enter something");
  }
  const result = analyzer.getSentiment(req.query.text.split(" "));
  const humanReadable = interpretSentiment(result);
  res.send({ rating: humanReadable, score: result });
});
const port = process.env.PORT || 8080;

app.listen(port, () => console.log("Listening"));
