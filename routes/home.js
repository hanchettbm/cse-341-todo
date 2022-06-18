const routes = require('express').Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
const Task = require('../controllers/tasks');

routes.get('/', ensureGuest, (req, res) => {
  res.render('login', {layout: 'login',});
});

routes.get('/dashboard', ensureAuth, async (req, res) =>{ 
  try {
    const tasks = await Task.find({user: req.user.id}).where('tasks').lean();
    res.render('dashboard', {
      name: req.user.firstName,
      tasks: tasks
    });
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
});

module.exports = routes;