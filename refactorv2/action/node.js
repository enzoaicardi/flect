export function getNodeAction(name){

    switch (name){
        case 'X-IF': return updateIfAction
        case 'X-FOR': return updateForAction
        default: throw 'Undefined'
    }

}

/**
 * context - this represent the component class instance
 * @param {*} _ the value of the variable
 * @param {HTMLElement} element the affected element
 * @param {Path} path
 */

// todo voir si patterne pas mieux ?
// car on recupère les matchs dedans et on peut changer a la volée
// todo faire methode mergepath (path1, path2) -> faire un push = meilleure idée ?
// probleme il faut cloner le path sinon on modifie le patterne
// -> product -> item -> product.index.name
// ou alors simplement récupérer la valeur et s'en servir comme base pour le chemin
export function updateIfAction(_, element, path){
    // this.getData(path)
    console.log('run x-if action !')
}

export function updateForAction(_, element, path){
    console.log('run x-for action !')
    // on boucle sur la variable
    // -> on créer / clone les elements
    // -> on bind / unbind les elements
    // ----> lors du bind possible de devoir cloner les paths dans les patternes
    // ----> BINDELEMENT ou PROXY CLONE ? que choisir ?
    // ----> et remplacer enfin les valeurs dynamiques

    // comment se passe le unbind sur les sous-boucles ?
    // normalement pas de soucis car boucles = unbind aussi
    // mais pour bien tout unbind il faut que le unbind soit plus profond ->
    // -> donc ne pas s'arreter a x-action, et si rencontre un x-element ?
    // ----> doit utiliser sa methode .unbind() pour unbind tout ses enfants ?
    // ----> la .unbind() methode devrait plutot supprimer le proxy temporairement
}