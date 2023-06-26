## Gestion d'états et micro composants

chaque x-... est un web composant custom en js vanilla

- x-node -> bind d'attributs
- x-text -> noeud
- x-for
- x-if

comme react utiliser un systeme de useState avec un setter ou alors un setter automatique définit pour l'objet dans la classe (set myvar(){_myrealvar})

avoir des propriétés du même type accessibles dans le micro composant et qui se met a jour tout seul comme avec un usestate.

```html
<label>
    <p>Email :</p>
    <input type="email">
</label>
```

```html
<x-for var="item" of="array" in="object" from="0" to="5">
    <label>
        <p><x-node text="item.label"></x-node></p>
        <input type="email">
    </label>
</x-for>
```

Mieux de fonctionner par attribut :
- x-... bind l'attribut pour sa valeur

Attributs spéciaux :
- x-text
- x-html
- data
- data-prop (natif)

La portée doit être de niveau bloc, et se rabattre sur window si n'est pas dans un composant, la détermination de la portée se fait au rendu du composant lorsqu'on passe le html.

On doit stocker dans la mémoire le rendu du premier composant plutot que de refaire l'inteprétation à chaque fois, utiliser un <template> stocké comme propriété du composant et cloner le noeud (si possible, a voir avec le binding des propriétés).

Avoir des variables magiques comme `$root` qui renvoie à l'élément racine du composant (ou au premier élément racine).

```js
define('input', (data)=>{

    data.type = data.type || 'text';

    return `
        <label>
            <p x-text="data.name"></p>
            <input x-type="data.type">
        </label>
    `;
});
```

```html
<x-input data="" data-name="">
```

```js
function define(name, renderFunction){
    // définir la nouvelle classe qui étend xElement (qui étend HTMLElement)
    // récupérer l'élément racine
    // récupérer les datas
    // bind les attributs
}
```