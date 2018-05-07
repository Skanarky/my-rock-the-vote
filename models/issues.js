const mongoose = require("mongoose");

const { Schema } = mongoose;

const issueSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: String,
    imgUrl: String,
    upVotes: Number,
    downVotes: Number
})

const IssueModel = mongoose.model("issues", issueSchema);
module.exports = IssueModel;
