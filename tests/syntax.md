## Gestion de presence

Comment gérer les if / for qui sont les deux essentiels a avoir ?

```html
<x-if var="condition">
    <!-- Html contenu dedans ici -->
</x-if>
<div x-if="condition">
    <!-- L'élément en lui même est évalué -->
</div>
```

Dans le premier cas si l'on décide que x-if (ou div x-if) est remplacé par son contenu il nous faut garder une référence à ce dernier quelque part, c'est à dire qu'il faudrait envisager un noeud de texte vide duquel on garde la référence comme premier frère de notre element :

```html
<!-- Invisible textNode with "" empty content -->
<div x-if="condition"></div>
```

On pourrait ainsi garder la même approche pour le `x-for` mais cela devient plus complexe car sans parent comment définir les bornes ou conserver l'interval ?

```html
<div x-for="data" x-var="item"></div>
```

Probleme, la replaceWith methode ne fait pas partie des instances de type TextNode... On doit donc se cantoner aux noeuds enfants pour obtenir l'effet escompté.

## Sous-données

Se pose aussi la question de l'accessibilité des sous données :

```html
<div x-type="product.name"></div>
```

Dans le cas présent il faudrait bind la variable produit entière et ne répercuter que le nom. Le problème est que cela revient a hydrater le composant à chaque changement sur le produit alors même qu'il peut s'agir seulement du prix, etc...

Afin d'éviter cela on peut imaginer une méthode pour "flat" un objet js simple qui transforme :

```js
datas.product = {
    name: 'Produit',
    price: {
        initial: 8,
        tax: 2,
        total: 10
    }
}

// devient

datas['product.name'] = 'Product';
datas['product.price.initial'] = 8;
datas['product.price.tax'] = 2;
datas['product.price.total'] = 10;
```

Et la on a résolu les problèmes de binding.

Il faut donc : mettre a disposition une telle méthode pour les objets créés de toute pièce dans la fonction de rendu, mais aussi fait la manipulation de manière automatique au data-binding sur l'élément afin d'éviter une surcharge cognitive !

Il faut aussi prendre en compte la directive speciale `datas` du data-binding qui convertit un json en objet js qui sera importé directement. Mais que faire si les utilisateurs passent directement un objet js ? A voir quels sont les cas pratiques car le passage d'un objet js semble plus pertinent a première vue. Sachant qu'il est toujours possible de faire un `this.flat(JSON.parse(data.objectAsString))`