const express = require('express');
const json = require('body-parser').json();

const People = require('./people.service');

const router = express.Router();

router.get('/', (req, res) => {
  // Return all the people currently in the queue.
  return res.send(People.get());
})

router.post('/', json, (req, res) => {
  // Add a new person to the queue.
  const newPerson = { ...req.body };
  People.enqueue(newPerson.name);
  res.status(204).end();
});

router.delete('/', (req, res) => {
  People.dequeue();
  res.status(204).end();
});

module.exports = router;
