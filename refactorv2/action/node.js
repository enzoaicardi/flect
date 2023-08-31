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
}

export function updateForAction(_, element, path){
    //
}