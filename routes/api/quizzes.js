const express = require('express');
const passport = require('passport');

const Quiz = require('../../models/Quiz');
const Subject = require('../../models/Subject');
const { request, response } = require('express');
const { json } = require('body-parser');

const router = express.Router();

router.post('/create/:subjectId', passport.authenticate('jwt', { session: false }), (request, response) => {
  const subjectId = request.params.subjectId;
  const newQuiz = new Quiz({
    subjectId: subjectId,
    title: request.body.title,
    subtitle: request.body.subtitle,
    question: request.body.question,
    choiceA: request.body.choiceA,
    choiceB: request.body.choiceB,
    choiceC: request.body.choiceC,
    choiceD: request.body.choiceD,
    answer: request.body.answer,
  });
  newQuiz.save()
    .then(quiz => response.json({ data: quiz, message: '已新增' }))
    .catch(err => response.json({ status: 'error', data: err }));
})

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  const id = request.params.id;
  const opts = {};
  opts.title = request.body.title;
  opts.subtitle = request.body.subtitle;
  opts.question = request.body.question;
  opts.choiceA = request.body.choiceA,
  opts.choiceB = request.body.choiceB,
  opts.choiceC = request.body.choiceC,
  opts.choiceD = request.body.choiceD,
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

router.get('/subject/:subjectId', passport.authenticate('jwt', { session: false }), (request, response) => {
  const subjectId = request.params.subjectId;
  Quiz.find({subjectId: subjectId})
  .then(quizzes => {
    Subject.findById(subjectId)
    .then(subject => {
      response.json({
        data: {
          subject: subject,
          quizzes: quizzes
        },
        status: 'success',
      })
    })
  })
  .catch(err => response.json({ status: 'error', data: err }));
})

router.get('/id/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  const id = request.params.id;
  Quiz.findById(id)
    .then(quiz => {
      Subject.findById(quiz.subjectId)
      .then(subject => {
        response.json({
          data: {
            subject: subject,
            quiz: quiz,
          },
          status: 'success',
        })
      })
    })
    .catch(err => response.json({ status: 'error', data: err }));
})

module.exports = router;