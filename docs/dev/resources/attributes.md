
# List of special attributes

## Universal attributes

### ref

`ref=<name>` create a reference to an HTML element. This reference is then accessible in the render function via `this.ref(name)` or `this.refs(name)`.

## Component attributes

### datas-(name)

Allows passing a JSON object as data.

```html
<x-component datas-product='{"name": "Apple", "quantity": 3}'></x-component>
```

::: info
Note that `x-datas-(name)` does not exist, because you can pass objects directly through variables with data-binding (`x-product="product"`).
:::

## Attributs d'éléments html

Any attribute prefixed with `x-` that is not listed below will be automatically bound to the variable whose name matches its value.

### x-text

Replaces the textual content of the element.

::: code-group
```html [render]
<p x-text="text">I'm visible</p>
```
```js [datas]
datas['text'] = 'Hello World!'
```
:::

### x-html

Replaces the HTML content of the element (be careful, this can break the links, to be used only as a last resort).

```js
datas['html'] = '<h1>My content</h1>';

this.render(/*html*/`
    <div x-html="html"></div>
`);
```

### x-append

Add a list of nodes as last children of the element.

```js
datas['el'] = document.createElement('div');

this.render(/*html*/`
    <div x-append="el"></div>
`);
```

### x-prepend

Add a list of nodes as first children of the element.

```js
datas['el'] = document.createElement('div');

this.render(/*html*/`
    <div x-prepend="el"></div>
`);
```

### x-show

Conditionally add a `display: none` style rule depending on whether the variable is true or false.

::: code-group
```html [render]
<div x-show="myvar">
    <p>I'm visible</p>
</div>
```
```js [datas]
datas['myvar'] = true
```
:::