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
      if (req.query._id) req.query._id = new ObjectId(req.query._id);
      MongoClient.connect(CONNECTION_STRING).then(db => {
        db.collection(project)
          .find(req.query)
          .toArray()
          .then(docs => res.json(docs))
          .catch(err => res.json(err));
      });
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
        // could be res.send() for project task
        res.json({ error: "missing inputs" });
      else
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
      const _id = req.body._id;
      delete req.body._id;
      // Delete empty fields
      Object.keys(req.body).map(k => {
        if (req.body[k].length === 0) delete req.body[k];
      });
      console.log(req.body);
      const updates = req.body;
      if (updates.open) {
        updates.open = String(updates.open) == "true";
      }

      if (Object.keys(updates).length === 0)
        // could be res.send() for project task
        res.json({ error: "nothing to update" });
      else
        MongoClient.connect(CONNECTION_STRING).then(db => {
          updates.updated_on = new Date();
          db.collection(project)
            .findAndModify(
              { _id: new ObjectId(_id) },
              [["_id", 1]],
              { $set: updates },
              { new: true }
            )
            .then(doc => res.json({ success: "successfully updated" }))
            .catch(err =>
              res.json({ error: "could not update " + _id + " " + err })
            );
        });
    })

    .delete(function(req, res) {
      var project = req.params.project;
    });
};
