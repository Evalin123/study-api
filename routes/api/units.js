const express = require('express');
const passport = require('passport');

const Unit = require('../../models/Unit');
const { request, response } = require('express');

const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), (request, response) => {
  const currentUser = request.user;
  const newUnit = new Unit({
    userId: currentUser.id,
    subject: request.body.subject,
    title: request.body.title,
    subtitle: request.body.subtitle,
    content: request.body.content,
  });
  newUnit.save()
    .then(unit => response.json({ data: unit, message: '已新增' }))
    .catch(err => response.json({ status: 'error', data: err }));
});

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  const id = request.params.id;
  const opts = {};
  opts.title = request.body.title;
  opts.subtitle = request.body.subtitle;
  opts.content = request.body.content;
  Unit.findOneAndUpdate({ _id: id },
    { $set: opts },
    { new: true })
    .then(unit => { response.json({ data: unit, message: '已編輯' }) })
    .catch(err => response.json({ status: 'error', data: err }));
});

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  const id = request.params.id;
  Unit.findOneAndDelete({ _id: id })
    .then(unit => response.json(unit))
    .catch(err => response.json({ status: 'error', data: err }));
});

router.get('/get/all', passport.authenticate('jwt', { session: false }), (request, response) => {
  Unit.find({}, (err, units) => {
    response.json(units);
  })
});

router.get('/get/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  const id = request.params.id;
  Unit.findById(id)
    .then(unit => response.json(unit))
    .catch(err => response.json({ status: 'error', data: err }));
})

module.exports = router;