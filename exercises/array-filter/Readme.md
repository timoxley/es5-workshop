A filter applies a test to each item in an array, producing a new
array containing only the items which pass the test.

e.g.

```
  +-+
  |A|      +-+
  | |      |A|
  |B| ---> | |
  | |      |C|
  |C|      +-+
  +-+
```

----

# Task

Use Array#filter to write a function that gets the ids of all of the
"logged in" users.

Your function should *return* an array containing only the user ids
of the logged in users.

## Arguments

* users: an Array of 10 to 100 random 'user objects' as described below

```js
{
  id: 12345, // random numeric id
  loggedIn: true // or false, depending on whether user is 'logged in'
}
```

## Example return value

```js
[ 317, 491, 2813 ]
```

## Conditions

* Do not use any for/while loops or Array#forEach.
* Do not create any unecessary functions e.g. helpers.
* Do not console.log

## Hint

* Try **chaining** some Array methods!

## Resources

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
