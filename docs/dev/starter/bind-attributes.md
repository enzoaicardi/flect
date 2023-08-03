# Bind attributes to your component

As we have seen previously we know how to create a component and display it on our page, but this one is not yet dynamic, and this is precisely what you are going to work on with the binding of attributes.

## What is attribute-binding ?

Imagine your `input` component:
```js
define('input', function(datas, render, style){

    datas['type'] = 'text';
    datas['placeholder'] = 'Enter your name';

    render(/*html*/`
        <input type="" placeholder="">
    `)

})
```

What if we want to make our `type` attribute dynamic? We would ideally want our `type` attribute to always equal our `datas['type']`.

To do this, we just have to specify on our `input` an `x-type` attribute whose value is equal to the name of the `datas` that we want to link to it, for example:

```js
define('input', function(datas, render, style){
    datas['type'] = 'text';

    render(/*html*/`
        <input x-type="type">
    `)
})
```

Now if we look in the DOM inspector we will observe the following thing:
```html [dom inspector]
<input type="text">
```

The advantage here is that our attribute value is tied to the state of our component, so if we decide to change the value of `datas['type']` it will automatically affect the HTML element in the DOM. Combined with the data link this becomes much more powerful.

::: tip
Adding the `x-` prefix in front of any attribute will bind its value to a piece of data, however there are special attributes that allow performing other actions like changing text, html content, etc... You can [find them here](../resources/attributes).
:::