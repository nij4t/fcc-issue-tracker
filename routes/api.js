/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

const CONNECTION_STRING = process.env.MONGOLAB_URI; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function(app) {
  app
    .route("/api/issues/:project")

    .get(function(req, res) {
      var project = req.params.project;
    })

    .post(function(req, res) {
      var project = req.params.project;
      const issue = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        created_on: new Date(),
        updated_on: new Date(),
        open: true,
        assigned_to: req.body.assigned_to || "",
        status_text: req.body.status_text || ""
      };

      if (!issue.issue_title || !issue.issue_text || !issue.created_by)
        res.json({ error: "missing inputs" });

      MongoClient.connect(CONNECTION_STRING).then(db => {
        db.collection(project)
          .insertOne(issue)
          .then(doc => {
            issue._id = doc.insertedId;
            res.json(issue);
          });
      });
    })

    .put(function(req, res) {
      var project = req.params.project;
    })

    .delete(function(req, res) {
      var project = req.params.project;
    });
};
