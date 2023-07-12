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


## this.iterable

`this.iterable(name, iterableName)` makes a number, string or array iterable by adding details to it as it is explored. This method is only useful when you want to retrieve the index during an iteration (for example when iterating over a number) :

- `item.key` return iteration index.
- `item.value` return iteration value.
- `item.parent` return the parent data.

```js
define('iterable', function(datas){

    datas['array'] = [9, 8, 7, 6, 5, 4, 3, 2, 1]
    this.iterable('array', 'iterable')

    render(/*html*/`
        <div x-for="iterable" var="item">
            <p>
                Key : <span x-text="item.key"></span> |
                Value : <span x-text="item.value"></span> |
                Parent : <span x-text="item.parent"></span>
            </p>
        </div>
    `)

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