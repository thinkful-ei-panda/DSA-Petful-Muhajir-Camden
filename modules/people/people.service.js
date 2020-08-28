const Queue = require('../queue/Queue')
const store = require('../../store')
const petsService = require('../pets/pets.service');

// Set up initial data.
// --------------------

const people = new Queue()
store.people.forEach(person => people.enqueue(person))

// --------------------

function get() {
  // Return all people in the queue.
  return people.all();
}

function enqueue(person) {
  // Add a person to the queue.
  people.enqueue(person);
}

function dequeue() {
  // Remove a person from the queue.
  return people.dequeue();
}

const randomPeople = [
  'Bruce Wayne',
  'Dick Grayson',
  'Jason Todd',
  'Timothy Drake',
]
// every 5 seconds remove demo user from
function getRandom(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx]
}

const types = ['cats', 'dogs'];

function removePerson() {
  if (store.people.includes(people.show()) || randomPeople.includes(people.show())) {
    dequeue()
    petsService.dequeue(getRandom(types))
  }
}

setInterval(() => removePerson(), 5000)

// if less < 5 people in q, add someone
function addPeople() {
  if (people.length < 5) {
    people.enqueue(getRandom(randomPeople))
  }
}

setInterval(() => addPeople(), 5000)

module.exports = {
  get,
  enqueue,
  dequeue,
}