[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# LinqScript

Esta biblioteca es un potente marco para crear objetos de consultas muy flexibles y poderosamente
semánticas gracias al tipado de Typescript, donde utilizamos un API fluida para agregar varios tipos 
de filtros a nuestras consultas, reglas de ordenamiento, agrupaciones, uniones y varias forma de conseguir resultados y de realizar encuestas a dichas consultas.

Con linqscript tienes una posibilidad ilimitada de crear flujos de consultas complejas, filtrar objetos iterables, ordenarlos, convertirlos o reproducirlos, paginar los resultados, muy similar a como trabajan los estándares SQL. 

Este trabajo inspirado en la robusta implementación de .Net Standard, posee un vasto conjunto métodos
que veremos mas adelante, como nos facilitara el trabajo con arreglos, collaciones, mapas y cualquier objeto iterable en JavaScript.

El *propsito de linq* es facilitar el trabajo con colleciones, registros y cualquier estructura o tipo de dato que sea iterable, a diferencia de sql, donde trabajamos con consultas esticas, aqui podemos lograr muchos resultados dinamicos en tiempo de ejecucion. La tarea de trabajar con datos, como el minado, la extracion, conversion, tratamiento y clasificacion se facilita mucho con esta poderosa herramienta. 

## Requisitos

Esta biblioteca apenas tiene requerimientos relevantes a mencionar basta con
[Node](http://nodejs.org/) y [NPM](https://npmjs.org/) para una instalacion de 5 segundos
To make sure you have them available on your machine,
Intenta utilizar estos comandos:

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```
Si todo sale bien, ya puedes incorporar esta biblioteca a tu proyecto
## Tabla de contenidos

- [LinqScript](#linqscript)
  - [Requisitos](#Requisitos)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Empezar](#empezar)
  - [Instalacion](#instalacion)
  - [Uso](#uso)
    - [Simple consulta](#simple-consultap)
    - [El metodo select](#el-metodo-select)
    - [Metodo para conocer resultados](#metodos-para-conocer-resultados)
    - [Ordenar resultados](#ordenar-resultados)
    - [Las consultas son iterables](#las-consultas-son-iterables)
    - ["Limites y desplazamiento"](#limites-y-desplazamiento)
  - [Running the tests](#running-the-tests)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Empezar

Para comenzar a trabajar con linqscript solo tienes que instalar el paquete en su repo oficial de npm
con los comandos de instalación

## Instalación

**Antes de Instalar:** por favor lea  [prerequisites](#prerequisites)

Para instalar la biblioteca ejecute el comando:

```sh
$ npm install -S linqscript
```

o si prefiere usar Yarn:

```sh
$ yarn add --dev linqscript
```

## Uso

### Simple consulta

Vamos a empezar por una simple consulta en donde tenemos un tipo de datos de cual tenemos un arreglo
que vendría siendo un registro que bien pudimos obtener de una base de datos, api rest u otro servicio cualquiera, entonces veamos dicha interfaz en Typescript:

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

Notar que esta interfaz tiene varios campos donde figuran datos de nuestro interés, por ejemplo si queremos sabes que usuarios pertenecen al grupo "a", podemos ejecutar el siguiente código de ejemplo.

```ts
import { from } from "linqscript";

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

Vamos a resaltar varios cosas, aquí estamos importando un función muy sencilla "from(iterable)",
que actúa como un factory, que es para recibir cualquier objeto iterable de JavaScript, mediante el tipado y las características de autocompletado de cualquier IDE, tenemos acceso a una experiencia mejorada del diseño de la consulta. Luego esta funciona nos devolverá un `IQueryable<T>`, que es la interfaz esencial de esta biblioteca, a través de cual establecemos filtros, reglas, operaciones y encuestas de varios tipos. El método "where(predicate)" nos agrega filtros para ir consiguiendo los resultados que vamos necesitando. Finalmente, después de agregar el filtro procedemos a encuestar los resultado para cual tenemos un gran numero de métodos y posibilidades. En este caso utilizamos "count()" que es análogo al length de los array y string, ya este nos devuelve la cantidad de registros que trae la consulta.

### El metodo select

Veamos el siguiente código para comprender como funciona select:

```ts
import { from } from "linqscript";

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
console.log(result); // expected [1, 2, 12, 18] array witd id values
```

El método "select" es de cierto modo análogo al metodo "map()" del prototipo de los `Array` en JavaScript, porque transforma el resultado de consulta y básicamente devuelve una nueva consultas con los filtros y reglas anteriores, pero con un nuevo tipo como argumento de la consulta.

### Metodo para conocer resultados
A continuación enumero algunos de los métodos de encuestas de resultados. 

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

### Ordenar resultados

A continuación  un ejemplo con ordenamiento, utilizando el registro de usuarios anteriores:

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
### Las consultas son iterables

Cualquier consulta que creemos, además de los métodos de encuestas, tenemos la posibilidad
utilizar las ultimas características que nos regara el Javascript moderno, como el bucle for-of,
por ejemplo:

```ts
const result = from(users).where(x => x.group !== "a"); // exclude all user with group "a"

for (const element of result) {
  console.log("debug element:", element);
}

```
### Limites y desplazamiento

```ts
 const query = new from(users);
        query.skip(1);
        query.take(1);

  console.log(query.count()); // the value is one

El limite y el desplazamiento sirven para crear paginas de resultados y crear reglas complejas de consultas.
Ambos metedos son simples, solo requieren el numero para limitar o desplazar como argumento, "skip" desplaza y "take" limita los resultados. 

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

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

[MIT License](https://andreasonny.mit-license.org/2019) © Oliver Valiente
