// Collections Functions (Array or Object)

// standardizeInput is a helper function to use with the functions that need to
// work with either objects or arrays
// It checks whether the input is an array and, if so, returns a copy of it;
// otherwise, it uses JavaScript's Object.values method to return an array that
// contains the values of the object's properties
const standardizeInput = function (collection) {
    return collection instanceof Array
      ? collection.slice()
      : Object.values(collection);
};

// Iterates over the collection of elements, passing each element in turn to the callback function. 
// Returns the original, unmodified, collection.

const myEach = function (collection, callback) {
    const newCollection = standardizeInput(collection);
  
    for (let idx = 0; idx < newCollection.length; idx++) {
      callback(newCollection[idx]);
    }
  
    return collection;
};

// Produces a new array of values by mapping each value in collection through a transformation function, callback.
// Returns the new array without modifying the original.

const myMap = function (collection, callback) {
  const newCollection = standardizeInput(collection);

  const newArr = [];

  for (let idx = 0; idx < newCollection.length; idx++) {
    newArr.push(callback(newCollection[idx]));
  }

  return newArr;
};

// Reduce iterates through a collection of values and boils it down into a single value. 
// acc (short for accumulator) starts at the value that's passed in as an argument, and with each successive step is updated to the return value of callback. 
// If a start value is not passed to myReduce, the first value in the collection should be used as the start value.

// The callback is passed three arguments: 
// 1) the current value of acc
// 2) the current element/value in our iteration
// 3) A reference to the entire collection.

const myReduce = function (collection, callback, acc) {
  let newCollection = standardizeInput(collection);

  // The if statement below handles the case where no start value is passed in
  // for the accumulator
  // If acc is null, it is set equal to the first value in newCollection
  // That first value is then sliced out of newCollection since it has already
  // been accounted for
  if (!acc) {
    acc = newCollection[0];
    newCollection = newCollection.slice(1);
  }

  const len = newCollection.length;

  for (let i = 0; i < len; i++) {
    acc = callback(acc, newCollection[i], newCollection);
  }

  return acc;
};

// Looks through each value in the collection, returning the first one that passes a truth test (predicate) or undefined if no value passes the test. 
// The function should return as soon as it finds an acceptable element, without traversing the rest of the collection.

const myFind = function (collection, predicate) {
  const newCollection = standardizeInput(collection);

  for (let idx = 0; idx < newCollection.length; idx++) {
    if (predicate(newCollection[idx])) return newCollection[idx];
  }

  return undefined;
};

// Looks through each value in the collection, returning an array of all the values that pass a truth test (predicate). 
// If no matching values are found, it should return an empty array.

const myFilter = function (collection, predicate) {
  const newCollection = standardizeInput(collection);

  const newArr = [];

  for (let idx = 0; idx < newCollection.length; idx++) {
    if (predicate(newCollection[idx])) newArr.push(newCollection[idx]);
  }

  return newArr;
};

// Return the number of values in the collection.

const mySize = function (collection) {
  const newCollection = standardizeInput(collection);
  return newCollection.length;
}

// Array Functions

// Returns the first element of an array. 
// Passing n will return the first n elements of the array.

const myFirst = function (arr, stop = false) {
  return stop ? arr.slice(0, stop) : arr[0];
};

// Returns the last element of an array. 
// Passing n will return the last n elements of the array.

const myLast = function (arr, start = false) {
  return start
    ? arr.slice(arr.length - start, arr.length)
    : arr[arr.length - 1];
};

// Retrieve all the names of the object's enumerable properties

const myKeys = function (obj) {
  const keys = [];
  for (let key in obj) {
    keys.push(key);
  }
  return keys;
};

// Return all of the values of the object's properties

const myValues = function (obj) {
  const values = [];
  for (let key in obj) {
    values.push(obj[key]);
  }
  return values;
};

// Returns a sorted copy of array, ranked in ascending order by the results of running each value through callback. 
// The values from the original array (not the transformed values) should be returned in the sorted copy, in ascending order by the value returned by callback

const mySortBy = function (arr, callback) {
  const newArr = [...arr];
  return newArr.sort(function (a, b) {
    if (callback(a) > callback(b)) {
      return 1;
    } else if (callback(b) > callback(a)) {
      return -1;
    } else {
      return 0;
    }
  });
};

// unpack is a helper function for myFlatten that is used when shallow is true
// It takes each element of the input array (whether it's a primitive value or
// an array) and pushes it into the output array
const unpack = function (receiver, arr) {
  for (let val of arr) {
    receiver.push(val);
  }
};

// myFlatten handles two separate cases: shallow=true and shallow=false
// For the true case, the top-level elements are simply pushed into newArr using
// the unpack helper function
// For the false case, myFlatten is called recursively for each element
const myFlatten = function (collection, shallow, newArr = []) {
  if (shallow) {
    for (let val of collection) {
      Array.isArray(val) ? unpack(newArr, val) : newArr.push(val);
    }
  } else {
    // shallow = false (recursive case)
    for (let val of collection) {
      if (Array.isArray(val)) {
        // Below, we pass newArr as an argument when we call myFlatten recursively
        // because we need to retain the values that were pushed in previous calls
        myFlatten(val, false, newArr);
      } else {
        newArr.push(val);
      }
    }
  }
  return newArr;
};