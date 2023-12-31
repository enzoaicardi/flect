
# Performances updates

## Parser

- [ ] utiliser createDocumentFragment.clone + innerHTML pour parser le HTML d'un render (pour cela utiliser template element + template.content)

## BindingMap

- [x] prendre un tableau comme argument (cela permet de ne boucler que sur children et pas sur childNodes)
- [ ] les matches doivent êtres stockés sur le xelement -> et reportés sur les elements

```js
this.createBindingMap(this.children)
```


## Effects

- [x] revoir la structure des effets
- [x] pour économiser de la mémoire, déléguer les fonctions à des fonctions nommées (comme pour xElement)
- [x] (EDIT pas de path, la valeur est renvoyée par les effets) supprimer getPatternValue, avoir une seule méthode unifiée de récupération de valeur, c'est cette valeur qui doit être transmise a l'effet et executée uniquement si elle a changée (cela permettrait de faire des effects: products[].name?)

- [x] ou alors crée un proxy pour chaque objet, meme imbriqué lors de sa définition sur l'objet global, c'est ce proxy qui se charge de lancer un effet lors de sa mise a jour

- [ ] lors de la mise a jour d'une propriété les effets directs sont appliqués mais aussi les effet de bord name[] -> et les enfants ? Les enfants sont-ils joués automatiquement (certainement puisqu'ils sont redéfinis -> a voir) ?

## Path

- [x] (EDIT recupérer seulement la partie du début, ne pas permettre de chainer après les filtres pour des raisons de performance) récupérer le chemin `{products[].name|filter}` split avec `(\.|\[)` puis dans chacun split les filtres
- [x] (EDIT on passe d'abord par l'effet global à chaques fois string concatenation dans le proxy effects key + name) les références sont fixes quand il s'agit de lettres ou de nombres, mais dynamiques lorsque `[]`

## Forloop (EDIT - devient un customelement)

- [ ] prévoir en amont la gestion des références
- [ ] prévoir l'index comme une entité supérieure qui serait utilisable partout ?
- [ ] (EDIT les references doivent êtres transmises par l'element en question lors de son binding et donc inclus dans la fonction bindElements) les références doivent êtres stockées sur les éléments root (de type documentFragment)
- [ ] voir comment supprimer efficacement des noeuds DOM comme LitJS -> remove classique

## Rollup (EDIT tenter de passer a ESbuild comparer taille bundle)

- [ ] penser a optimiser le mangle en utilisant des noms peu communs

## Polyfill

- [ ] a voir si utile car templates ne sont pas supportés par IE11 et firefox 35, et en terme d'usage firefox < 35 = 0 - en fait es6 est supporté a 100% sauf IE11 donc...

- [ ] réaliser un polyfill prenant en compte les mutation observer (compatible IE11) et qui permet de se passer des customelements sans presque rien changer (ne doit pas apporter une grosse surcouche au code)

- [ ] pour un support complet, passer le composant sous forme de fonction, la fonction remplace init, on peut définir des propriétés sur la fonction elle meme (comme render par exemple) et elles serint transmises a la classe apres son extends.

- [ ] changer replaceWith par replaceChild et toutes les methodes qui sont de l'ES6 pur pour augmenter la compatibilité
