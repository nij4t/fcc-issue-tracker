/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    var _id
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);

          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'open');
          assert.property(res.body, 'status_text');
          assert.property(res.body, '_id');

          assert.equal(res.body.issue_title, 'Title')
          assert.equal(res.body.issue_text, 'text')
          assert.equal(res.body.created_by, 'Functional Test - Every field filled in')
          assert.equal(res.body.assigned_to, 'Chai and Mocha')
          assert.equal(res.body.status_text, 'In QA')
          assert.isBoolean(res.body.open)
          assert.isTrue(res.body.open)

          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title 2',
          issue_text: 'text',
          created_by: 'Functional Test - Required fields filled in'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);

          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'open');
          assert.property(res.body, 'status_text');
          assert.property(res.body, '_id');

          _id = res.body._id

          assert.equal(res.body.issue_title, 'Title 2')
          assert.equal(res.body.issue_text, 'text')
          assert.equal(res.body.created_by, 'Functional Test - Required fields filled in')
          assert.equal(res.body.assigned_to, '')
          assert.equal(res.body.status_text, '')
          assert.isBoolean(res.body.open)
          assert.isTrue(res.body.open)

          done();
        })
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title 3',
          created_by: 'Functional Test - Missing required fields',
          assigned_to: 'Mocha and Chai'
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'missing inputs')
          done()
        })
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({_id})
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'nothing to update')
          done()
        })
      });
      
      test('One field to update', function(done) {
      // TODO: One field to update (PUT /api/issues/{project} => text')   
        chai.request(server)
        .put('/api/issues/test')
        .send({ _id: _id, issue_text: 'updates issue text' })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.property(res.body, 'success')
          assert.equal(res.body.success, 'successfully updated')
          done()
        })
      });
      
      test('Multiple fields to update', function(done) {
       // TODO: Multiple fields to update (PUT /api/issues/{project} => text')
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        // TODO: No filter (GET /api/issues/{project} => Array of objects with issue data)
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        // TODO: Multiple filters (test for multiple fields you know will be in the db for a return)
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        //TODO: No _id (DELETE /api/issues/{project} => text)
      });
      
      test('Valid _id', function(done) {
        //TODO: Valid _id (DELETE /api/issues/{project} => text)      
      });
      
    });

});
