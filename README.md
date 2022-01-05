[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# ECMALinq

This library is a powerful framework for creating very flexible and powerfully query objects.
semantics thanks to Typescript typing, where we use a fluent API to add various types
of filters to our queries, ordering rules, groupings, unions and various ways of obtaining results and conducting surveys to said queries.

With ecmascript you have an unlimited possibility to create complex query flows, filter iterable objects, sort them, convert or reproduce them, paginate the results, very similar to how SQL standards work.

This work, inspired by the robust implementation of .Net Standard, has a vast set of methods
that we will see later, how it will facilitate the work with arrangements, collations, maps and any iterable object in JavaScript.

The *purpose of linq* is to make it easier to work with **collections**, **records** and any structure or data type that is **iterable**, unlike sql, where we work with static queries, here we can achieve many dynamic results at runtime. The task of working with data such as mining, extraction, conversion, treatment and classification is made much easier with this powerful tool.

## Requirements

This library has hardly any relevant requirements to mention, just
[Node] (http://nodejs.org/) and [NPM] (https://npmjs.org/) for a 5 second install
To make sure you have them available on your machine,

Try using these commands:

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```
If everything goes well, you can now incorporate this library into your project

## Table of Contents

- [ecmascript](#ecmascript)
  - [Requirements](#Requirements)
  - [Table of contents](#table-of-contents)
  - [Start](#start)
  - [Installation](#installation)
  - [Use](#use)
    - [Simple query](#simple-query)
    - [The select method](#the-select-method)
    - [Method to know results](#methods-to-know-results)
    - [Sort results](#sort-results)
    - [Queries are iterable](#queries-are-iterable)
    - [The 'create()' helper](#the-'create()'-helper)
    - ["Limits and displacement"](#limits-and-displacement)
  - [Running the tests](#running-the-tests)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Begin

To start working with ecmascript you just have to install the package in its official npm repo
with installation commands

## Installation

**Before Installing:** please read [prerequisites](#prerequisites)

To install the library run the command:


```sh
$ npm install -S ecmascript
```

or to if you use Yarn:

```sh
$ yarn add --dev ecmascript
```
## Use

### Simple query

We are going to start with a simple query where we have a data type of which we have an array
which would be a record that we could well obtain from a database, rest api or any other service, so let's see that interface in Typescript:

```ts
type User = {
    id: number,
    username: string,
    group: string,
    data?: string,
    followers: number,
    login?: Date
};
```

Note that this interface has several fields where data of our interest are contained, for example if we want to know which users belong to group "a", we can execute the following example code.

```ts
import { from } from "ecmascript";

type User = {
    id: number,
    username: string,
    group: string,
    data?: string,
    followers: number,
    login?: Date
};

const users: User[] = [
    {
        id: 1,
        username: "john",
        followers: 100,
        group: "a"
    },
    {
        id: 2,
        username: "charles",
        followers: 140,
        group: "d"
    },
    {
        id: 12,
        username: "victor",
        followers: 400,
        group: "c"
    },{
        id: 18,
        username: "tony",
        followers: 25,
        group: "a"
    }
];

const result = from(users).where(x => x.group === "a").count();

// show the result
console.log(result); // expected 2
```

We are going to highlight several things, here we are importing a very simple function "from (iterable)",
which acts as a factory, which is to receive any iterable JavaScript object, using the typing and autocompletion features of any IDE, we have access to an improved query design experience. Then this works, it will return an `IQueryable <T>`, which is the essential interface of this library, through which we establish filters, rules, operations and surveys of various types. The "where (predicate)" method adds filters to get the results we need. Finally, after adding the filter we proceed to survey the results for which we have a large number of methods and possibilities. In this case we use "count ()" which is analogous to the length of the arrays and strings, and this returns the number of records that the query brings up.

### The select method

Let's look at the following code to understand how select works:


```ts
import { from } from "ecmascript";

type User = {
    id: number,
    username: string,
    group: string,
    data?: string,
    followers: number,
    login?: Date
};

const users: User[] = [
    {
        id: 1,
        username: "john",
        followers: 100,
        group: "a"
    },
    {
        id: 2,
        username: "charles",
        followers: 140,
        group: "d"
    },
    {
        id: 12,
        username: "victor",
        followers: 400,
        group: "c"
    },{
        id: 18,
        username: "tony",
        followers: 25,
        group: "a"
    }
];

const result = from(users)
              .where(x => x.group === "a")
              .select(x => x.id);

// show the result
console.log(result); // expected [1, 18] array witd id values
```

The "select" method is somewhat analogous to the "map ()" method of the `Array` prototype in JavaScript, because it transforms the query result and basically returns a new query with the previous filters and rules, but with a new type as the query argument.

### Method to know results

Below I list some of the methods of survey results.

```ts
const myQuery = from(data).where(x => /*my filter*/);

myQuery.first(); // the first result
myQuery.last(); // the last element
myQuery.any(); // return true if any result is match
myQuery.all(); // return true if all result is match
myQuery.contains(); // require an argument, a fucntion that return a
// condition and return true if exist an element with this condition
myQuery.toArray(); // get an array with query elements
myQuery.toSet(); // an Set instance with results
myQuery.toJson(); // a json string ready to send by http or write on a file
// and more...
```


### Sort Results


```ts
let result = from(users)
              .where(x => x.group === "a")
              .orderBy(x => x.followers);

// show the result
console.log(result.first()); // expected {
//       id: 1,
//       username: "tony",
//       followers: 25,
//       group: "a"
//}
// user with less followers

let result = from(users)
              .orderByDecending(x => x.followers);

// show the result
console.log(result.first()); // expected {
//       id: 1,
//       username: "victor",
//       followers: 400,
//       group: "c"
//}
// user with more followers

// sort with custom algorith
let result = from(users)
              .orderBy((elm1, elm2) => elm2.username.length < elm1.username.length);

// show the result
console.log(result.first()); // expected {
//       id: 1,
//       username: "charles",
//       followers: 140,
//       group: "d"
//}
// user with more followers
```

### Queries are iterable

Any query that we create, in addition to the survey methods, we have the possibility
use the latest features that modern Javascript will give us, such as the for-of loop,
for example:

```ts
import { from } from "ecmascript";

const result = from(users).where(x => x.group !== "a"); // exclude all user with group "a"

for (const element of result) {
  console.log("debug element:", element);
}

```

### The 'create()' helper

```ts
import { create } from "ecmascript";

 const query = create(next =>{
            next(1);
            next(1);
            next(2);
        });

// three times the next is invoked then the count() is 3
console.log(query.count());

// show result: 1, 1, 2
for (const element of result) {
  console.log("debug element:", element);
}

```

### Limits and displacement

``` ts
const query = new from (users);
         query.skip (1);
         query.take (1);

console.log (query.count ()); // the value is one
```
Limit and offset are used to create results pages and create complex query rules.
Both methods are simple, they only require the number to limit or move as an argument, "skip" moves and "take" limits the results.

```
## Running the tests

```sh
$ npm test
```
En los test encontraremos muchisimo pero muchismo ejemplos de usos acerca de esta biblioteca.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Oliver Valiente** - [Oliver Valiente](https://github.com/oliver021)

See also the list of [contributors](https://github.com/oliver021/ecmalinq/contributors) who participated in this project.

## License

[MIT License](https://andreasonny.mit-license.org/2019) © Oliver Valiente
