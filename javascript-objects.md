# Javascript Tricks

## Uncommonly Seen API's

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