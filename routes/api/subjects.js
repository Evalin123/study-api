const express = require('express');
const passport = require('passport');

const Subject = require('../../models/Subject');

const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), (request, response) => {
  const currentUser = request.user;
  const newSubject = new Subject({
    userId: currentUser.id,
    title: request.body.title,
    description: request.body.description,
  });
  newSubject.save()
    .then(subject => response.json({ data: subject, message: '已新增' }))
    .catch(err => response.json({ status: 'error', data: err }));
})

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  const id = request.params.id;
  const opts = {};
  opts.title = request.body.title;
  opts.description = request.body.description;
  Subject.findOneAndUpdate({ _id: id },
    { $set: opts },
    { new: true })
    .then(subject => { response.json({ data: subject, message: '已編輯' }) })
    .catch(err => response.json({ status: 'error', data: err }));
});

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  const id = request.params.id;
  Subject.findOneAndDelete({ _id: id })
    .then(subject => response.json(subject))
    .catch(err => response.json({ status: 'error', data: err }));
});

router.get('/get/all', passport.authenticate('jwt', { session: false }), (request, response) => {
  Subject.find({}, (err, subjects) => {
    response.json(subjects);
  })
});

router.get('/get/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  const id = request.params.id;
  Subject.findById(id)
    .then(subject => response.json(subject))
    .catch(err => response.json({ status: 'error', data: err }));
});

module.exports = router;