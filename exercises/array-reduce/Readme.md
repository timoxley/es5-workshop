A reduce takes some values and "reduces" them to some single value, as
visualised below:

```
  +-+
  |A|
  | |
  |B| ---> D
  | |
  |C|
  +-+
```

The key concept is that you're reducing multiple *values* to a single
*value*. While map and filter always produce arrays, the result of a
reduction can be of any type e.g. strings, numbers, objects, or even
another array.

A reduce is a useful construct when you're accumulating some result
where each step of the calculation depends on the value of previous
calculations.

Like forEach/map/filter, Array#reduce takes a function which will be
called for each item in the array. This function will be passed `currentItem`, `index` and
`array` as arguments, but unlike forEach/map/filter, these start at the
second argument – the first argument passed to the reduction function will be return value of
the previous reduction step:

```js
arr.reduce(function(previousValue, currentItem, index, array) {
  return nextValue // this value will be passed to next iteration
})
```

e.g. If the previous step returned the value 3, the first argument to
the next step will be 3. If that step now returns 5, the first argument
to the next iteration is 5.

It's important to remember to **always return a value from your
iteration function**, otherwise the following step will receive
`undefined` as the `previousValue`.

What is the value of the `previousValue` for the first iteration where
there is no previous iteration? For this, reduce takes a second
argument, after the iteration function. This second argument will be the
value of the `previousValue` for the first iteration.

```js
arr.reduce(function(previousValue, currentValue, index, array) {
  return nextValue // this value will be passed to next iteration
}, initialValue) // initialValue is 'previousValue' for first step
```

Warning: if you do not supply an `initialValue`, the first step's
`previousValue` will be the first value in the array. Iteration then
starts at the second item in the array. If you only have one item in the
array then the reduce simply returns that value. This behaviour is
mostly confusing so it's advisable to **always supply an initial
value**.

----

# Task

Given an Array of strings, use `Array#reduce` to create an object that contains the number of times each string occured in the array. Return the object directly (no need to console.log).

## Example

```js
var inputWords = ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian']

console.log(countWords(inputWords))

// =>
// {
//   Apple: 2,
//   Banana: 1,
//   Durian: 3
// }
```

## Arguments

* inputWords: An array of random Strings.

## Conditions

* Do not use any for/while loops or Array#forEach.
* Do not create any unecessary functions e.g. helpers.

## Hints

* Remember to supply an initialValue
* Remember to return from each step of the iteration.

## Resources

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
* https://en.wikipedia.org/wiki/Reduce_(higher-order_function)
