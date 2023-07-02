# Define a component

Pour définir un composant vous devez utiliser `define(...)`, la seule fonction globale fournie par Flect.

```js
define(
    name, // component name
    initFunction, // initialization function
    styles, // scoped styles
)
```

Liste des arguments:
- `name` correspond au nom de votre composant, lorsque vous appelez ce composant dans votre html il est impératif de préfixer son nom par `x-`. Ainsi `input` devient `<x-input>`.
- `initFunction` correspond à la fonction n'initialisation du composant, c'est là où l'on va rendre le html contenu à l'intérieur du composant, modifier et lier les propriétés.
- `styles` correspond à la fonction qui permet de rendre des styles limités au composant.

# Create a timer