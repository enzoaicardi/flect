# Render a component

You've just learned the syntax for defining a component with `define(...)`, now we go a little deeper into the structure of the `renderFunction`.

```js
define('input', function(datas){
    // render here
})
```

::: warning
You must imperatively use the keyword `function` to build your rendering function and not an arrow function of the form `()=>{...}` otherwise the execution context will not be passed in the right way.
:::

## datas

As you can see in the example above we invoked the render function with a first `datas` parameter.

This parameter corresponds to all the dynamic data relating to our component. So it is important to define the reactive data as properties of the `datas` variable.

```js
define('input', function(datas){
    datas['type'] = 'text';
    datas['placeholder'] = 'Enter your name';
})
```

In this example we have defined the `type` and `placeholder` variables in our component, and it is quite possible to redefine them later.

## render

Now we are going to add a new argument to our render function, it is `render`, `render(...)` acts as a function to render HTML elements relative to the component.

```js
define('input', function(datas, render){

    datas['type'] = 'text';
    datas['placeholder'] = 'Enter your name';

    render(/*html*/`
        <input type="" placeholder="">
    `)

})
```

::: info
You may have noticed a little `/*html */` comment before the backticks, this comment is not required, but it helps to achieve syntax highlighting with visual-studio-code if you use the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) extension.
:::

At this stage our component is operational but not dynamic. We can already try calling it in our HTML like this :
```html [index.html]
<body>
    <x-input></x-input>
</body>
```

If you open the DOM inspector of your browser you will observe the following rendering :
```html [dom inspector]
<body>
    <input type="" placeholder="">
</body>
```

As you just noticed the `x-input` custom component is no longer part of the DOM tree, this keeps your code cleaner and more predictable.

## style

Now we are going to add a last argument to our render function, it is `style`, `style(...)` acts as a function which takes as its only argument a function that returns a string.

This function has a single parameter corresponding to the sector of the component, which makes it possible to set up more predictable styles.

```js
define('input', function(datas, render, style){

    style($ => /*css*/`
        ${$} {
            background-color: red;
        }
    `)

    datas['type'] = 'text';
    datas['placeholder'] = 'Enter your name';

    render(/*html*/`
        <input type="" placeholder="">
    `)

})
```

If you open the DOM inspector of your browser you will observe the following rendering :
```html [dom inspector]
<head>
    <style x-scoped-stylesheet>
        [style-ref="x0"] {
            background-color: red;
        }
    </style>
</head>
<body>
    <input type="" placeholder="" style-ref="x0">
</body>
```

::: info
The use of the `style(...)` function is not at all mandatory to have a functional component, so you can absolutely use your own style sheets or css frameworks like UnoCSS or Tailwind.
:::