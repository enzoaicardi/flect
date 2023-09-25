/* xElement {
    getValue = getValueFromPattern
    getData = getValueFromPath
} */

import { xregex } from "../utils/regex.js";

export function getValueFromPattern(pattern, object){

    // if the base is equal to a data name
    if(pattern.datas[pattern.base]){
        return this.getData(pattern.datas[pattern.base], object)
    }

    // replace all groups by their match
    return pattern.base.replace(xregex, (group) => {
        return this.getData(pattern.datas[group], object)
    });

}

export function getValueFromPath(path, object = this._xdatas){

    // TODO se débarraser des filtres en acceptant les datas comme fn
    // peut faciliter la mise en place des x-ref -> gérer automatiquement ?

    // loop over steps but stop if value is falsy
    for(let x = 0; x < path.steps.length && !!object; x++){

        let step = path.steps[x]
            object = object[step[0]]

        for(let i = 1; i < step.length; i++){

            object = this.filters[step[i]](object)

        }

    }

    return path.not ? !object : object

}