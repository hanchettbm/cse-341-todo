const routes = require('express').Router();
const {ensureAuth} = require('../middleware/auth');
const Task = require('../controllers/tasks');

routes.get('/add', ensureAuth, (req, res) => {
  try {
  res.render('tasks/add');
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
});

routes.post('/', ensureAuth, async (req, res) =>{ 
  try {
   req.body.user = req.user.id;
   await Task.create(req.body);
   res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
});

routes.get('/edit/:id',  ensureAuth, async (req, res) =>{ 
  try {
    const task = await Task.findOne({
      _id: req.params.id
    }).lean()

    if (!task) {
      return res.render('error/404');
    }

    if(task.user != req.user.id) {
      res.redirect('/dashboard');
    } else {
      res.render('tasks/edit', {task});
    }

} catch (error) {
  console.error(error);
  res.render('error/500');
}
  
});

routes.put('/:id', ensureAuth, async (req, res) => {
  try {
    let task = await Task.findOne({
      _id: req.params.id
    }).lean()
    if(!task){
      return res.render('error/404')
    }

    if (task.user != req.user.id) {
      res.redirect('/dashboard');
      console.log("You do Not have permission to edit this task");
    } else {
      task = await Task.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true, 
        runValidators: true
      });
      res.redirect('/dashboard');
    }
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }

});

routes.delete('/:id',  ensureAuth, async (req, res) =>{ 
  try {
     await Task.remove({_id: req.params.id});
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
  
});

module.exports = routes;