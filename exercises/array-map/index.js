"use strict"

var fs = require('fs')
var path = require('path')

var verify = require('adventure-verify');

exports.problem = fs.readFileSync(__dirname + '/Readme.md', 'utf8')
exports.solution = fs.readFileSync(__dirname + '/solution.js', 'utf8')
exports.boilerplate = fs.readFileSync(__dirname + '/boilerplate.js', 'utf8')

var solution = require('./solution')

exports.verify = verify(function(args, t) {
  t.plan(2)
  var input = generateInput()

  var usedMap = false
  var map = Array.prototype.map
  Array.prototype.map = function() {
    usedMap = true
    return map.apply(this, arguments)
  }

  var submission = require(path.resolve(process.cwd(), args[0]))
  var expected = solution(input)
  var actual = submission(input)
  t.ok(usedMap, 'Array#map must be used.')
  t.deepEqual(actual, expected)
})

var run = exports.run = function(args) {
  var numbers = generateInput()
  var submission = require(path.resolve(process.cwd(), args[0]))
  console.log(submission(numbers))
}

function generateInput() {
  var total = randomInt(5, 19)
  var numbers = []
  for (var i = 0; i < total; i++) {
    numbers.push(randomInt(1, 10))
  }
  return numbers
}

function randomInt(min, max) {
  return Math.floor((Math.random() * max - min) + min)
}

