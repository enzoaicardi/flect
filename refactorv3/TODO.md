
# Performances updates

## Parser

- [ ] utiliser createDocumentFragment.clone + innerHTML pour parser le HTML d'un render (pour cela utiliser template element + template.content)

## BindingMap

- [ ] prendre un tableau comme argument (cela permet de ne boucler que sur children et pas sur childNodes)

```js
this.createBindingMap(this.children, matches)
```

## BindElements

- [ ] penser a utiliser des objets stockeurs de référence ou a stocker la previous value afin d'éviter les mises a jour inutiles du DOM via effects

## Effects

- [ ] revoir la structure des effets
- [x] pour économiser de la mémoire, déléguer les fonctions à des fonctions nommées (comme pour xElement)
- [ ] supprimer getPatternValue, avoir une seule méthode unifiée de récupération de valeur, c'est cette valeur qui doit être transmise a l'effet et executée uniquement si elle a changée (cela permettrait de faire des effects: products[].name?)

- [x] ou alors crée un proxy pour chaque objet, meme imbriqué lors de sa définition sur l'objet global, c'est ce proxy qui se charge de lancer un effet lors de sa mise a jour

## Forloop

- [ ] prévoir en amont la gestion des références
- [ ] prévoir l'index comme une entité supérieure qui serait utilisable partout ?
- [ ] les références doivent êtres stockées sur les éléments root (de type documentFragment)
- [ ] voir comment supprimer efficacement des noeuds DOM comme LitJS

## Rollup

- [ ] penser a optimiser le mangle en utilisant des noms peu communs