# comp4537_ai_hackathon

AI node module found at https://www.npmjs.com/package/natural
Documentation: https://naturalnode.github.io/natural/sentiment_analysis.html

1. npm install natural
2. const natural = require("natural"); at the top of your server.js
3. Use the natural.Analyzer to compare two strings, seen by:

   - const analyzer = new Analyzer("English", stemmer, "afinn");
   - const result = analyzer.getSentiment(req.query.text.split(" "));

4. "node server.js" in console to start
5. localhost:8080/ai?text="the text you want to analyze"
6. DONE!
