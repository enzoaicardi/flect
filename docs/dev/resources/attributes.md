
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

## Attributs d'éléments html

Any attribute prefixed with `x-` that is not listed below will be automatically bound to the variable whose name matches its value.

### x-text

Replaces the textual content of the element.

::: code-group
```html [render]
<div x-toggle="className" class="button">
    <p>I'm visible</p>
</div>
```
```js [datas]
datas['className'] = 'hidden' || ''
```
:::

### x-html

Replaces the HTML content of the element (be careful, this can break the links, to be used only as a last resort).

### x-append

Adds one or more elements as last children of the element.

### x-prepend

Adds one or more elements as first children of the element.

### x-toggle

Conditionally adds a class based on whether it exists or not.

::: code-group
```html [render]
<div x-toggle="className" class="button">
    <p>I'm visible</p>
</div>
```
```js [datas]
datas['className'] = 'hidden' || ''
```
:::

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

### x-if

Conditionally displays the content of an HTML element depending on whether the `datas[name]` is true or false.

::: code-group
```html [render]
<div x-if="!myvar">
    <p>I'm not visible</p>
</div>
```
```js [datas]
datas['myvar'] = true
```
:::

### x-for

Duplicates the content of an element as many times as the variable contains elements (the variable can be an array or a number).

::: code-group
```html [render]
<div x-for="array" var="item">
    <p>My name is <b x-text="item"></b></p>
</div>
```
```js [datas]
datas['array'] = ['John', 'Emily', 'Steven', '...']
```
:::

### var

Can only be combined with `x-for`, it allows access to the elements of an array inside the loop.