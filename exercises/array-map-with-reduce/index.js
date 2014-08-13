"use strict"

var fs = require('fs')
var path = require('path')

var verify = require('adventure-verify');

exports.problem = fs.readFileSync(__dirname + '/Readme.md', 'utf8')
exports.solution = fs.readFileSync(__dirname + '/solution.js', 'utf8')
exports.boilerplate = fs.readFileSync(__dirname + '/boilerplate.js', 'utf8')

var solution = require('./solution')

exports.verify = verify(function(args, t) {
  var submission = require(path.resolve(process.cwd(), args[0]))

  var operation = generateOperation()
  var nums = generateNums()

  var actual = submission(nums.slice(), operation)
  var expected = solution(nums.slice(), operation)

  t.deepEqual(actual, expected)

  t.end()
})

exports.run = function(args) {
  var submission = require(path.resolve(process.cwd(), args[0]))

  var operation = function(item) {
    return item * 2
  }
  var nums = generateNums()

  console.log(submission(nums.slice(), operation))
}

function randomInt(min, max) {
  return Math.floor((Math.random() * max - min) + min)
}

function generateOperation() {
  var value = randomInt(2, 5)
  return function randomOperation(item, index, arr) {
    return item * value
  }
}

function generateNums() {
  return new Array(randomInt(5, 19))
  .join(',')
  .split(',')
  .map(function() {
    return randomInt(2, 9)
  })
}
