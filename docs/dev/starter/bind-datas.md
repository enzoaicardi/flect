# Bind datas to your component

Linking data to a component can be done via attributes, just like for classic HTML elements the `x-` prefix refers to dynamic data. Thus it is possible to pass data dynamically through the components.

The data entered in the attributes without the `x-` prefix are raw data, they can be retrieved directly from the component and manipulated as desired:

::: code-group
```html [index.html]
    <x-component name="John Doe"></x-component>
```

```js [components.js]
define('component', function(datas, render){
    render(/*html*/`
        <p x-text="name"></p>
    `)
})
```
:::

The data entered in the attributes with the `x-` prefix are dynamic data that is passed to another component, so they can be used for communication between the components.

::: code-group
```html [index.html]
    <x-parent name="John Doe"></x-parent>
```

```js [parent.js]
define('parent', function(datas, render){
    render(/*html*/`
        <x-child x-name="name"></x-child>
    `)
})
```

```js [child.js]
define('child', function(datas, render){
    render(/*html*/`
        <p x-text="name"></p>
    `)
})
```
:::