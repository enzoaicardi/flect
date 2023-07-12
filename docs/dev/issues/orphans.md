# What are HTML Orphans ?

Orphaned HTML elements are elements that are considered by the HTML parser to be invalid outside of their parent. This concerns in particular the `td, th, tr, thead, tbody, tfoot` elements which are invalid if they are outside a `table` tag, as well as the majority of common tags in the HTML5 specification are not valid inside a `table` tag.

This limitation is due to the use of the `DOMParser()` of javascript, and is therefore not related to the operation of `flect`. This can cause many problems when creating your components when you use table elements.

## Examples

The examples below are invalid:

::: code-group

```js [tbody-component]
define('table', function(datas){

    render(/*html*/`
        <table>
            <tbody x-for="products" var="item">
                <tr>
                    <td x-text="item.name"></td>
                    <td x-text="item.price"></td>
                </tr>
            </tbody>
        </table>
    `)

    /* invalid - render :
        <table>
            <tbody></tbody>
        </table>
    */

})
```

```js [tbody-custom-tr-component]
define('table', function(datas){

    render(/*html*/`
        <table>
            <tbody x-for="products" var="item">
                <x-custom-tr x-item="item"></x-custom-tr>
            </tbody>
        </table>
    `)

    /* invalid - render :
        <table>
            <tbody></tbody>
        </table>
    */

})
```

```js [custom-tr-component]
define('custom-tr', function(datas){

    render(/*html*/`
        <tr>
            <td x-text="item.name"></td>
            <td x-text="item.price"></td>
        </tr>
    `)

    /* invalid - render :
        ""
    */

})
```

:::

## Solution

The fastest solution is still to opt for creating a table with [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/).