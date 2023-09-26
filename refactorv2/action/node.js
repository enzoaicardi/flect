import { xcomment } from "../utils/node.js"

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

function updateIfAction(_, element, path){
    // this.getData(path)
    // console.log('run x-if transformer !')
}

function updateForAction(_, element, path){

    // defaults values
    element.unbindmap || (element.unbindmap = {})

    // retrieve bindmap
    let map = path.bindmap

    // forloop setup
    let count = element.count || (element.count = 0)
    let value = this.getData(path)
    let length = typeof value === 'number' ? value : value.length
    let gap = length - count

    if(gap > 0){

        for(let x = count; (x < count + gap) && x < length; x++){

            let clone = map.rootElement.cloneNode(true)
            let child;
            // TODO modifier le patterne pendant le binding
            console.log(map)

            // get unbindmap
            element.unbindmap[x] = this.bindElement(clone, map, true)

            // insert childs before boundary
            while(child = clone.firstChild){
                child._xindex = x
                element.parentNode.insertBefore(child, element)
            }

            console.log('+ add element')
        }

    }

    // TODO revoir toutes les boucles for sur elements pour firstElementChild

    else if(gap < 0){

        for(let x = count - 1; (x > (count - 1) + gap) && x >= 0; x--){

            let sibling;

            while((sibling = element.previousSibling) && sibling._xindex === x){
                sibling.remove()
            }

            // clear memory
            this.unbindElements(element.unbindmap[x])

            console.log('- remove element')
        }

    }

    element.count += gap

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