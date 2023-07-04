# List of elements and datas properties

## el.component

Access to the component from every child element.

```js
render(/*html*/`
    <div onclick="console.log(this.component)"></div>
`)
// <x-component></x-component>
```

## datas.text

Access to the textContent of the x-element.

```js
<x-component>
    This is my text content
</x-component>

console.log(datas['text'])
// "This is my text content"
```

## datas.html

Access to the innerHtml of the x-element.

```js
<x-component>
    <h1>My title</h1>
</x-component>

console.log(datas['html'])
// "<h1>My title</h1>"
```

## datas.body

Access to the body elements of the x-element.

```js
<x-component>
    <h1>My title</h1>
    <p>My text</p>
</x-component>

console.log(datas['body'])
// [text, h1, p, text]
```