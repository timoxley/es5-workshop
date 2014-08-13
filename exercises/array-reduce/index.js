"use strict"

var lorem = require('lorem-ipsum')

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
  t.ok(actual, 'should return some value.')
  t.ok(Object.prototype.toString.call(actual) === '[object Object]', 'value should be an Object.')
  t.ok(actual && Object.keys(actual).length, 'object should have some properties.')
  t.ok(actual && Object.keys(actual).every(function(key) {
    return typeof actual[key] == 'number'
  }), 'object should only have properties whose values are numbers.')

  actual && Object.keys(actual).forEach(function(key) {
    t.equal(expected[key], actual[key], '"' + key + '" appears ' + expected[key] + ' times.')
  })
  t.deepEqual(actual, expected, 'objects should match exactly')
  t.end()
})

exports.run = function(args) {
  var input = generateInput()
  var submission = require(path.resolve(process.cwd(), args[0]))
  var expected = solution(input)
  var actual = 
  console.log(submission(input))
}

function generateInput() {
  return lorem({count: 2, units:'sentences'})
  .replace(/([^\w ])/g, '')// remove non-words and spaces
  .toLowerCase() // lowercase I guess
  .split(' ') // create array of words
}
