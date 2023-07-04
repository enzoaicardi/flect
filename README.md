<img src="./docs/assets/logo.svg" width="200" align="center">

The 2kb fuly reactive component library.

Consider to [read the documentation](https://flect.aicardi.pro).

```js
define('input', function(datas, render){
    render(/*html*/`
        <label>
            <p x-text="label">Name</p>
            <input x-type="type" x-placeholder="placeholder">
        </label>
    `)
})
```

```html
<x-input
    type="number"
    label="How old are you ?"
    placeholder="Enter a number please">
</x-input>
```