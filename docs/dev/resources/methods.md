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

## this.custom

It is an empty object which allows to store your own data/functions related to the component.

```js
datas.custom.log = txt =>{
    console.log('log :' + txt)
};

this.render(/*html*/`
    <div onclick="this.component.custom.log('hello')"></div>
`);
```