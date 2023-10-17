/*

*/

import { getPathValue, getPatternValue } from "../path/path-accesser.js"

export function getDataAction(name, path){

    path.once = true
    path.data = name.substring(2)
    path.key = path.key || path.data

    return path.isPattern ? updateDataPatternAction : updateDataAction

    // <x-test x-product="items.products.0"><x-test>

    // ...
    // mettre a jour les datas en les passant par tunnel
    // cela se fait au bindElements mais stocké dans les onces
    // car la référence est directement passée donc pas besoin de
    // mise a jour
    // ... Ajouter les références potentielles... a explorer

    /*
        ...
    */

}

function updateDataAction(value, path){
    this.datas[path.data] = getPathValue(value, path)
}

function updateDataPatternAction(value, pattern, key){
    this.datas[pattern.data] = getPatternValue(value, pattern, key)
}