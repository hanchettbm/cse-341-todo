const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const results = await connect.getCollection().find();
    results.toArray().then((documents) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(documents);
      console.log("Returned All tasks");
    });
  } catch (err) {
    res.status (500) .json(err);
  }
};

const getSingle = async (req, res) => {
  try {
    const taskId = new ObjectId(req.params.id);
    const results = await connect.getCollection().find({_id: taskId});
    results.toArray().then((documents) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(documents[0]);
      console.log(`Returned task ${req.params.id}`);
    });
  } catch (err) {
    res.status (500) .json(err);
  }
};

const createTask = async (req, res) => {
  try {
    const task = {
        task: req.body.task,
        location: req.body.location,
        startTime: req.bodystartTime,
        startDate: req.body.startDate,
        who: req.body.who,
        deadlineDate: req.body.deadlineDate,
        deadlineTime: req.body.deadlineTime
    };
    const response = await connect.getCollection('todolist').insertOne(task);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred: could not create task.');
    }
  } catch (err) {
    res.status (500) .json(err);
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = new ObjectId(req.params.id);
    const task = {
      task: req.body.task,
      location: req.body.location,
      startTime: req.body.startTime,
      startDate: req.body.startDate,
      who: req.body.who,
      deadlineDate: req.body.deadlineDate,
      deadlineTime: req.body.deadlineTime
    };
    const results = await connect.getCollection('todolist').replaceOne({ _id: taskId }, task);
    console.log(results);
    if (results.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(results.error || 'An error occurred: Can not update the task.');
    }
  } catch (err) {
    res.status (500) .json(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = new ObjectId(req.params.id);
    const results = await connect.getCollection('todolist').deleteOne({ _id: taskId }, true);
    console.log(results);
    if (results.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(results.error || 'An error occurred: Can not delete the contact.');
    }
  } catch (err) {
    res.status (500) .json(err);
  }
};

  module.exports = { getAll, getSingle, createTask, updateTask, deleteTask };