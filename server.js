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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Request-With"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/ai", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    console.log(body);
    if (!body) {
      res.end("Please enter something");
    }
    const result = analyzer.getSentiment(body.split(" "));
    const humanReadable = interpretSentiment(result);
    const data = { rating: humanReadable, score: result };
    // res.end({ rating: humanReadable, score: result });
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

const port = process.env.PORT || 8888;

app.listen(port, () => console.log("Listening"));
