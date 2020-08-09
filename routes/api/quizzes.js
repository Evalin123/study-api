const express = require('express');
const passport = require('passport');

const Quiz = require('../../models/Quiz');
const { request, response } = require('express');

const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), (request, response) => {
  const currentUser = request.user;
  const newQuiz = new Quiz({
    userId: currentUser.id,
    subject: request.body.subject,
    title: request.body.title,
    subtitle: request.body.subtitle,
    question: request.body.question,
    answer: request.body.answer,
  });
  newQuiz.save()
    .then(unit => response.json({ data: unit, message: '已新增' }))
    .catch(err => response.json({ status: 'error', data: err }));
})

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  const id = request.params.id;
  const opts = {};
  opts.title = request.body.title;
  opts.subtitle = request.body.subtitle;
  opts.question = request.body.question;
  opts.answer = request.body.answer;
  Quiz.findByIdAndUpdate({ _id: id },
    { $set: opts },
    { new: true })
    .then(quiz => { response.json({ data: quiz, message: '已編輯' }) })
    .catch(err => response.json({ status: 'error', data: err }));
})

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  const id = request.params.id;
  Quiz.findByIdAndDelete({ _id: id })
    .then(quiz => response.json(quiz))
    .catch(err => response.json({ status: 'error', data: err }));
})

router.get('/get/all', passport.authenticate('jwt', { session: false }), (request, response) => {
  Quiz.find({}, (err, quiz) => {
    response.json(quiz);
  })
})

router.get('/get/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  Quiz.findById(id)
    .then(unit => response.json(unit))
    .catch(err => response.json({ status: 'error', data: err }));
})

module.exports = router;