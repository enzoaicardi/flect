# Specials action Elements

Action elements should not be considered as containers because they will not be displayed during the evaluation of the DOM, in the same way as classic components (they are not web-components, however).

Actions can be combined with each other and therefore nested within each other.

## x-if

Display content if var is true. Work only inside of a component.

```html
<x-component>
    <x-if var="title">
        <h1 x-text="title">My title</h1>
    </x-if>
</x-component>
```

## x-for

Loop over an array and clone content for every item. Get the item through a variable.

```html
<x-component>
    <x-for var="products" key="item">
        <h1 x-text="item.title">My title</h1>
    </x-for>
</x-component>
```