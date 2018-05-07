const express = require("express");
const issueRouter = express.Router();

const IssueModel = require("../models/issues.js");
// const CommentModel = require("../models/comments.js");

issueRouter.route("/")
    .get((req, res) => {
        IssueModel.find(req.query, (err, foundIssues) => {
            if (err) return res.send(err);
            res.status(200).send(foundIssues);
        })
    })
    .post((req, res) => {
        const newIssue = new IssueModel(req.body);
        newIssue.save((err, addedIssue) => {
            if (err) return res.send(err);
            res.status(201).send(addedIssue);
        })
    });


issueRouter.route("/:id")
    .get((req, res) => {
        IssueModel.findOne({ _id: req.params.id }, (err, foundIssue) => {
            if (err) return res.send(err);
            if (!foundIssue) return res.status(404).send({ message: "Issue not found" })
            res.status(200).send(foundIssue);
        })
    })
    .delete((req, res) => {
        IssueModel.findOneAndRemove({ _id: req.params.id }, (err, deletedIssue) => {
            if (err) return res.send(err);
            if (!deletedIssue) return res.status(404).send({ message: "Issue not found" })
            res.status(200).send({ message: `Issue '${deletedIssue.title}' with id: ${req.params.id} was successfully deleted!` });
        })
    })
    // Below not used, deletion done by filer and map in the front-end
    // .delete((req, res) => {
    //     CommentModel.deleteMany({issueId: req.params.id},(err, deleteStatus)=>{
    //         if (err) return res.send(err);
    //         IssueModel.findOneAndRemove({ _id: req.params.id}, (err, deletedIssue)=>{
    //             if (err) return res.send(err);
    //             if (!deletedIssue) return res.status(404).send({message: "Issue not found"})
    //             res.status(200).send({ message: `Issue '${deletedIssue.title}' with id: ${req.params.id} was successfully deleted!` })
    //         })
    //     })
    // })
    .put((req, res) => {
        IssueModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedIssue) => {
            if (err) return res.send(err);
            if (!updatedIssue) return res.status(404).send({ message: "Issue not found" });
            res.status(200).send(updatedIssue);
        })
    })

module.exports = issueRouter;