const express = require('express');
const passport = require('passport');

const Unit = require('../../models/Unit');
const Subject = require('../../models/Subject');
const { request, response } = require('express');

const router = express.Router();

router.post('/create/:subjectId', passport.authenticate('jwt', { session: false }), (request, response) => {
  const subjectId = request.params.subjectId;
  const newUnit = new Unit({
    subjectId: subjectId,
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

router.get('/id/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
  const id = request.params.id;
  Unit.findById(id)
    .then(unit => {
      Subject.findById(unit.subjectId) 
      .then(subject => {
        response.json({
          data: {
            unit: unit,
            subject: subject,
          },
          status: 'success',
        })
      })
    })
    .catch(err => response.json({ status: 'error', data: err }));
});

router.get('/subject/:subjectId', passport.authenticate('jwt', { session: false }), (request, response) => {
  const subjectId = request.params.subjectId;
  Unit.find({subjectId: subjectId})
    .then(units => {
      Subject.findById(subjectId) 
      .then(subject => {
        response.json({
          data: {
            units: units,
            subject: subject,
          },
          status: 'success',
        })
      })
    })
    .catch(err => response.json({ status: 'error', data: err }));
});

module.exports = router;