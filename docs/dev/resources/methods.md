# List of renderFunction methods

## this.ref

`this.ref(name)` return the first matching element with attribute `ref="name"`.

## this.refs

`this.refs(name)` return an array of all matching element with attribute `ref="name"`.

## this.effect

`this.effect(name, function)` add an effect when detecting change on a dynamic data. Effects are the basis of variable dynamism and are used internally by Flect.

```js
define('input', function(datas){

    datas['count'] = 0
    datas['countText'] = ''
    setInterval(() => datas['count']++, 500)

    this.effect('count', (value) => datas['countText'] = 'Counter score is :' + value)
    // watch changes on datas['count'] and pass it's value to parametter
})
```

## this.flat

`this.flat(name, object)` distribute all the properties of an object into the dynamic datas of the component. To understand its usefulness, it must be understood that by default only first-level data is dynamic and accessible in HTML, [Learn more here](/resources/datas).

The `object` parametter is optionnal, if you dont specify it, it will try to find the object corresponding to `datas[name]`.

## this.custom

It is an empty object which allows to store your own data/functions related to the component.

```js
datas.custom.log = txt =>{
    console.log('log :' + txt)
};

this.render(/*html*/`
    <div onclick="this.x.custom.log('hello')"></div>
`);
```