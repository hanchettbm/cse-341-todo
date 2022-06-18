const routes = require('express').Router();
const {ensureAuth} = require('../middleware/auth');
const User = require('../controllers/user');

routes.get('/user/get-all', ensureAuth, async (req, res) => {
  try {
  let results = await User.findOne();
    console.log('results');
    console.log("Returned All Users");
  } catch (error) {
    console.error(error);
    res.status (500) .json(error);
    res.render('error/500');
  }
});

routes.get('/user/get-single/:id', ensureAuth, async (req, res) => {
    try {
    let results = await User.findOne({_id: req.params.id});
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

routes.post('/user/ceate', ensureAuth, async (req, res) =>{ 
  try {
   req.body.user = req.user.id;
   const response = await User.create(req.body);
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

routes.put('/user/edit/:id', ensureAuth, async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.id
    })
    if(!user){
      return res.render('error/404');
    }

    if (user.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(user.error || 'An error occurred: Can not update the User.');
      }

    if (user.user != req.user.id) {
      res.redirect('/dashboard');
      console.log("You do Not have permission to edit this User");
    } else {
      user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {
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

routes.delete('/user/delete/:id',  ensureAuth, async (req, res) =>{ 
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