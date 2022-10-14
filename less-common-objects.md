# Less Common Objects

## Table of Contents

- [Less Common Objects](#less-common-objects)
  - [Table of Contents](#table-of-contents)
  - [Objects](#objects)
    - [Map](#map)
    - [Set](#set)
    - [WeakMap and WeakSet](#weakmap-and-weakset)
    - [Symbol](#symbol)
    - [Reflect](#reflect)
    - [Proxy](#proxy)
    - [Generator](#generator)
    - [Decorator](#decorator)
    - [Intl](#intl)
    - [TypedArray](#typedarray)
    - [RegExp](#regexp)
      - [Helpful Developer Tools](#helpful-developer-tools)
  - [References](#references)

## Objects

### Map

A map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.

```js
let map = new Map();

map.set("1", "str1"); // a string key
map.set(1, "num1"); // a numeric key
map.set(true, "bool1"); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
alert(map.get(1)); // 'num1'
alert(map.get("1")); // 'str1'

alert(map.size); // 3
```

### Set

A Set is a special type collection – “set of values” (without keys), where each value may occur only once.

```js
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
alert(set.size); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
```

### WeakMap and WeakSet

WeakMap is a Map that allows only objects as keys and removes them once they become inaccessible by other means.

```js
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // works fine (object key)

// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object

weakMap.get(obj); // "ok"
```

WeakSet is a special kind of Set that does not prevent JavaScript from removing its items from memory. WeakSets are used mostly as an “additional” data structure to store “secondary” information about objects.

```js
let weakSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

weakSet.add(john);
weakSet.add(pete);

// can't add other types into the set
weakSet.add("test"); // Error, because "test" is not an object

weakSet.add(mary);

// we can't get set values
// there's no get method in WeakSet

// we can't iterate over it
// weakSet.forEach(...) // Error, not supported

// there's no size property
// weakSet.size // Error, there's no size

// we can't clear it either
// weakSet.clear() // Error, not supported

// we can delete elements
weakSet.delete(john);
```

### Symbol

Symbols are guaranteed to be unique. Even if we create many symbols with the same description, they are different values. The description is just a label that doesn’t affect anything.

```js
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
```

Symbols are skipped by for…in.

```js
let id = Symbol("id");
let user = {
  name: "John",
  [id]: 123, // not "id": 123
};

for (let key in user) alert(key); // name

alert("Direct: " + user[id]); // Direct: 123
```

Symbols are accessible directly, without using for…in.

```js
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123,
};

let clone = Object.assign({}, user);

alert(clone[id]); // 123
```

Symbols in a literal

```js
let id = Symbol("id");

let user = {
  name: "John",
  age: 30,
  [id]: 123,
};

let id2 = Symbol("id");

// these are same symbols
alert(id == id2); // false
```

### Reflect

The Reflect object is built-in, as a wrapper around the JavaScript’s internal methods. It’s not a function object, so it’s not callable.

```js
let user = {
  name: "John",
};

Reflect.setPrototypeOf(user, {});

// same as
// Object.setPrototypeOf(user, {});
```

### Proxy

The Proxy object is used to define custom behavior for fundamental operations (e.g. property lookup, assignment, enumeration, function invocation, etc).

```js
let user = {
  name: "John",
};

let proxy = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return target[prop];
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
    target[prop] = val;
    return true;
  },
});

// look at the calls above
proxy.name = "Pete"; // set name=Pete
alert(proxy.name); // get name
```

### Generator

Generators are special functions that can be paused and resumed. They are created using a special syntax. Generators are what is called “iterable” objects. They are used in many modern JavaScript frameworks.

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // {value: 1, done: false}

let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}

let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, done: true}
```

### Decorator

Decorators are special functions that allow us to “decorate” classes, methods, and properties. Decorators are a stage 2 proposal for JavaScript.

```js
function f() {
  console.log("f(): evaluated");
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("f(): called");
  };
}

function g() {
  console.log("g(): evaluated");
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("g(): called");
  };
}

class C {
  @f()
  @g()
  method() {}
}

new C().method();
```

### Intl

The Intl object is the namespace for the ECMAScript Internationalization API, which provides language sensitive string comparison, number formatting, and date and time formatting.

```js
let currency = 123456.789;

console.log(
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(currency)
); // $123,456.79

console.log(
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(currency)
); // 123.456,79 €

console.log(
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(currency)
); // 123 456,79 ₽
```

### TypedArray

TypedArray is a special kind of array that provides a mechanism for accessing raw binary data. It is a base for the DataView object. This can be useful for working with binary data, for example, reading a stream of bytes from a file or a network connection.

```js
let buffer = new ArrayBuffer(16); // create 16 bytes buffer

let int32View = new Int32Array(buffer); // create a view of 32-bit integers

// fill the view with data
for (let i = 0; i < int32View.length; i++) {
  int32View[i] = i * 2; // 0, 2, 4, 6...
}

console.log(int32View); // Int32Array(4) [0, 2, 4, 6]
```

### RegExp

Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. These patterns are used with the exec and test methods of RegExp, and with the match, replace, search, and split methods of String.

#### Helpful Developer Tools

- [Regexr](https://regexr.com/)
- [RexEgg](https://www.rexegg.com/regex-quickstart.html)

```js
/* Ways to create a RegExp object */

// Method 1 - using a regular expression literal
let simplePhoneNumberRegex = /\d{3}-\d{3}-\d{4}/;

// Method 2
let simplePhoneNumberRegex = new RegExp("\\d{3}-\\d{3}-\\d{4}");

/* RegExp methods */

// test() - returns true if the pattern is found in the string
let simplePhoneNumberRegex = /\d{3}-\d{3}-\d{4}/;
let result = simplePhoneNumberRegex.test("555-555-5555");
console.log(result); // true

// exec() - returns an array of information or null on a mismatch
let simplePhoneNumberRegex = /\d{3}-\d{3}-\d{4}/;
let result = simplePhoneNumberRegex.exec("555-555-5555");
console.log(result); // ["555-555-5555", index: 0, input: "555-555-5555", groups: undefined]

/* RegExp properties */

// global - true if the "g" flag is set
let simplePhoneNumberRegex = /\d{3}-\d{3}-\d{4}/g;
console.log(simplePhoneNumberRegex.global); // true

// ignoreCase - true if the "i" flag is set
let simplePhoneNumberRegex = /\d{3}-\d{3}-\d{4}/i;
console.log(simplePhoneNumberRegex.ignoreCase); // true

// multiline - true if the "m" flag is set
let simplePhoneNumberRegex = /\d{3}-\d{3}-\d{4}/m;
console.log(simplePhoneNumberRegex.multiline); // true
```

## References

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [W3Schools](https://www.w3schools.com/js/default.asp)
- [JavaScript Tutorial](https://www.tutorialspoint.com/javascript/index.htm)
- [JavaScript for Cats](http://jsforcats.com/)
- [JavaScript for Impatient Programmers](https://exploringjs.com/impatient-js/toc.html)
- [Eloquent JavaScript](https://eloquentjavascript.net/)
