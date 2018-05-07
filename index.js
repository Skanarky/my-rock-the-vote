const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const logger = require("./middleware/logger.js");

const issueRouter = require("./routes/issues.js");
const commentRouter = require("./routes/comments.js");

const app = express();
const port = process.env.PORT ||  3001;
const db = process.env.MONGODB_URI || "mongodb://localhost:27017/rock-vote";

//middleware
app.use(bodyParser.json());
app.use(logger);
app.use(express.static(path.join(__dirname, "client", "build")));

//routes
app.use("/api/issues", issueRouter);
app.use("/api/comments", commentRouter);

app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

mongoose.connect(db, (err) => {
    if (err) console.error(err);
    console.log("Connected to MongoDB");
})
app.listen(port, () => console.log("Server running on port " + port));

