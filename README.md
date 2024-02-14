# Warning

Flect is currently depreciated, please consider switching to [vif.js](https://vifjs.dev) !

---

<p align="center">
    <img src="./docs/assets/logo.svg" width="160">
</p>

The 2kb fuly reactive component library.

Consider to [read the documentation](https://flect.aicardi.pro).

```js
define("input", function (datas, render) {
    render(/*html*/ `
        <label>
            <p x-text="label">Name</p>
            <input x-type="type" x-placeholder="placeholder">
        </label>
    `);
});
```

```html
<x-input
    type="number"
    label="How old are you ?"
    placeholder="Enter a number please"
>
</x-input>
```

-   `flect.js` ~ 4.5kb (minified)
-   `flect.js.gz` ~ 2kb (minified + gzip)
