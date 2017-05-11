var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://einnor:secret@ds161190.mlab.com:61190/tasker', ['tasks']);

// Get all tasks
router.get('/tasks', function(req, res, next) {
  db.tasks.find(function(err, tasks) {
    if(err) {
      res.send(err);
    }
    res.json(tasks);
  });
});

// Get one task
router.get('/tasks/:id', function(req, res, next) {
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
    if(err) {
      res.send(err);
    }
    res.json(task);
  });
});

// Save a task
router.post('/tasks', function(req, res, next) {
  task = req.body;
  if(!task.title || (task.isDone + '')) {
    res.status(400);
    res.json({
      'error': 'Bad data'
    });
  }
  else {
    db.tasks.save(task, function(err, task) {
      if(err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

// Delete a task
router.delete('/tasks/:id', function(req, res, next) {
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, task) {
    if(err) {
      res.send(err);
    }
    res.json(task);
  });
});

// Update a task
router.put('/tasks/:id', function(req, res, next) {
  var task = req.body;
  var updatedTask = {};

  if(task.isDone) updatedTask.isDone = task.isDone;
  if(task.title) updatedTask.title = task.title;

  if(!updatedTask) {
    res.status(400);
    res.json({'error': 'Bad data'});
  }
  else {
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updatedTask, {}, function (err, task) {
      if(err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

module.exports = router;
