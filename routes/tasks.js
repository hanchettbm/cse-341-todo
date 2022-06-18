const routes = require('express').Router();
const {ensureAuth} = require('../middleware/auth');
const Task = require('../controllers/tasks');

routes.get('/tasksSwagger/get-all', ensureAuth, async (req, res) => {
  try {
  let results = await Task.findOne();
  console.log('results');
    console.log("Returned All Users");
  } catch (error) {
    console.error(error);
    res.status (500) .json(error);
    res.render('error/500');
  }
});

routes.get('/tasksSwagger/get-single/:id', ensureAuth, async (req, res) => {
    try {
    let results = await Task.findOne({_id: req.params.id});
    results.toArray().then((documents) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(documents[0]);
        console.log(`Returned User ${req.params.id}`);
    });
    } catch (error) {
      console.error(error);
      res.status (500) .json(error);
      res.render('error/500');
    }
  });

routes.post('/tasksSwagger/ceate', ensureAuth, async (req, res) =>{ 
  try {
   req.body.user = req.user.id;
   const response = await Task.create(req.body);
   if (response.acknowledged) {
    res.status(201).json(response);
} else {
    res.status(500).json(response.error || 'An error occurred: could not create user.');
}
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
});

routes.put('/tasksSwagger/edit/:id', ensureAuth, async (req, res) => {
  try {
    let task = await Task.findOne({
      _id: req.params.id
    })
    if(!task){
    }

    if (task.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(task.error || 'An error occurred: Can not update the User.');
      }

    if (task.user != req.user.id) {
      res.redirect('/dashboard');
      console.log("You do Not have permission to edit this User");
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

routes.delete('/tasksSwagger/delete/:id',  ensureAuth, async (req, res) =>{ 
  try {
     let results = await User.remove({_id: req.params.id});
     console.log(results);
    if (results.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(results.error || 'An error occurred: Can not delete the contact.');
    }
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
  
});

module.exports = routes;