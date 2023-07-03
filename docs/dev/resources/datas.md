# Datas explained

By default only first-level data is dynamic and accessible in HTML:

```js
define('text', function(datas, render){

    datas['product'] = {
        name: 'Bag',
        price: 45
    }

    // Not working - datas['product.name'] does not exist !
    render(/*html*/`
        <p x-text="product.name"></p>
    `)

    datas['product.name'] = 'Bag'
    setTimeout(() => datas['product'].name = 'Cat')

    // Working But - datas['product.name'] does not change !
    render(/*html*/`
        <p x-text="product.name"></p>
    `)

})
```

There are two solutions to this problem, the first is to manually set all properties of the object. The second is to use the [flat method](/resources/methods).

```js
define('text', function(datas, render){

    datas['product.name'] = 'Bag'
    datas['product.price'] = 45

    // Working and dynamic !
    render(/*html*/`
        <p x-text="product.name"></p>
    `)

    datas['product'] = {
        name: 'Bag',
        price: 45
    }

    this.flat('product');

    // Working and dynamic !
    render(/*html*/`
        <p x-text="product.name"></p>
    `)

})
```