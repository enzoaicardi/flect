# Define a component

To define a component you must use `define(...)`, the only global function provided by Flect.

```js
define(
    name, // component name
    renderFunction // initialization function
)
```

List of arguments:
- `name` corresponds to the name of your component, when you call this component in your html it is imperative to prefix its name with `x-`. Thus `input` becomes `<x-input>`.
- `renderFunction` corresponds to the initialization function of the component, this is where we will render the html contained inside the component, the style, and above all modify and link the properties.