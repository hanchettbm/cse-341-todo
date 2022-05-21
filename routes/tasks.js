const routes = require('express').Router();

const tasksController = require('../controllers/tasks');

routes.get('/', tasksController.getAll);

routes.get('/:id', tasksController.getSingle);

routes.post('/', tasksController.createTask);

routes.put('/:id', tasksController.updateTask);

routes.delete('/:id', tasksController.deleteTask);

module.exports = routes;