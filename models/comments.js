const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
    container: {
        required: true,
        type: String
    },
    issueId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "issues"
    }
})

const CommentModel = mongoose.model("comments", commentSchema);
module.exports = CommentModel;