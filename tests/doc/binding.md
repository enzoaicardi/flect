
# Fonctionnement du binding

```html
<x-element><x-element>
```

Tout attribut sur un x-element qui ne commence pas par un `x-` est considéré comme l'attribution d'une valeur statique. Pour cette raison c'est lorsque l'élément va être analysé comme un web-composant par le navigateur que ce dernier doit rechercher ses attributs pour en faire une donnée.