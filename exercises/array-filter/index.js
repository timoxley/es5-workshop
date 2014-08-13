"use strict"

var fs = require('fs')
var path = require('path')

var verify = require('adventure-verify');

exports.problem = fs.readFileSync(__dirname + '/Readme.md', 'utf8')
exports.solution = fs.readFileSync(__dirname + '/solution.js', 'utf8')
exports.boilerplate = fs.readFileSync(__dirname + '/boilerplate.js', 'utf8')

var solution = require('./solution')

exports.verify = verify(function(args, t) {
  var input = generateInput()

  var submission = require(path.resolve(process.cwd(), args[0]))
  var expected = solution(input)
  var actual = submission(input)

  actual.forEach(function(id) {
    var match = input.filter(function(user) {
      return user.id == id
    })
    t.ok(match.length === 1, 'Checking user '+id+' exists.')
    var user = match.pop()
    t.ok(user.loggedIn, 'Ensuring user '+id+' is logged in: ' + JSON.stringify(user))
  })
  t.deepEqual(actual, expected)
  t.end()
})

exports.run = function(args) {
  var input = generateInput()

  var submission = require(path.resolve(process.cwd(), args[0]))
  console.log(submission(input))
}

function generateInput() {
  var total = randomInt(8, 16)
  var input = []
  for (var i = 0; i < total; i++) {
    input.push({
      id: i+randomInt(10, 100),
      loggedIn: Math.random() < 0.7
    })
  }

  // ensure at least one...
  input.push({
    id: i+randomInt(10, 100),
    loggedIn: true
  })

  // ...of each
  input.push({
    id: i+randomInt(10, 100),
    loggedIn: false
  })
  return input
}

function randomInt(min, max) {
  return Math.floor((Math.random() * max - min) + min)
}
