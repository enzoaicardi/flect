# What is Flect ?

Flect is a javascript library that allows you to easily define responsive web components in an optimized way.

The goal is to allow you to define a set of components in javascript:
```js [my-components.js]
define('my-component', /* magic is here */)
```

And call them directly in your html:
```html [index.html]
<x-my-component></x-my-component>
```

If that's still too fuzzy, check out the examples here.

# Installation

Flect is a fuly front-end library, so the only thing you have to do is import the javascript file into your code, either by uploading it or using the link to the package.

```html [index.html]
<script src="https://unpkg.com/flect/flect.js" defer>
<script src="./my-custom-script.js" defer>
```

::: warning
You must imperatively call flect.js before any other script that could be used to define your components.
:::

Once you have done this you can start defining your components in your javascript files.