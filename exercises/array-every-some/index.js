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
  var submission = require(path.resolve(process.cwd(), args[0]))
  var input = generateInput()
  var good = input.good
  var lists = input.lists


  var actualTest = submission(good)
  var expectedTest = solution(good)
  t.equal(typeof actualTest, 'function', 'Should return a function.')

  var actualGoodLists = 0
  var expectedGoodLists = 0

  lists.forEach(function(list) {
    var actualOk = actualTest(list)
    var expectedOk = expectedTest(list)
    if (expectedOk) expectedGoodLists++
    if (actualOk) actualGoodLists++
    if (!expectedOk) t.equal(actualOk, expectedOk, 'Checking bad list')
    else t.equal(actualOk, expectedOk, 'Checking good list')
  })
  t.equal(actualGoodLists, expectedGoodLists, 'found '+expectedGoodLists+' good lists')
  t.end()
})

exports.run = function(args) {
  var submission = require(path.resolve(process.cwd(), args[0]))
  var actualTest = submission(good)
  var input = generateInput()
  var good = input.good
  var lists = input.lists

  var actualGoodLists = 0
  lists.forEach(function(list) {
    var actualOk = actualTest(list)
    if (actualOk) actualGoodLists++
  })
  console.log('found '+actualGoodLists+' good lists')
}

function generateInput() {
  var good = makeListOfUsers()
  var bad = makeListOfUsers()
  var lists = Array.apply(null, {length: 5}).map(function() {
    return Array.apply(null, {length: 5}).map(function() {
      if (Math.random() < 0.95) {
        return good[randomInt(0, good.length - 1)]
      } else {
        return bad[randomInt(0, bad.length - 1)]
      }
    })
  })
  return {
    good: good,
    lists: lists
  }
}


function randomInt(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min)
}

function makeUser() {
  return {
    id: randomInt(0, 1000),
    name: lorem().split(' ').slice(0, 2).map(function(word) {word[0] = word[0].toUpperCase(); return word;}).join(' ')
  }
}

function makeListOfUsers() {
  return new Array(randomInt(5, 10))
  .join(',')
  .split(',')
  .map(makeUser)
}
