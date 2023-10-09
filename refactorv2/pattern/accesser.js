/* xElement {
    getValue = getPatternValue
    getData = getPathValue
} */

import { xregex } from "../utils/regex.js";

export function getPatternValue(pattern, element){

    // if the base is equal to a data name
    if(pattern.datas[pattern.base]){
        return this.getPathValue(pattern.datas[pattern.base], element)
    }

    // replace all groups by their match
    return pattern.base.replace(xregex, (group) => {
        return this.getPathValue(pattern.datas[group], element)
    });

}

export function getPathValue(path, element){

    let data = this._xdatas

    // loop over steps but stop if value is falsy
    for(let x = 0; x < path.steps.length && !!data; x++){
        
        // set the new step
        let step = path.steps[x]
            data = step.reference ? 
                    this.getPathValue(step.reference, element)[element._xmatches.get(step.reference)] : 
                    data[step[0]]

        // apply filters if exists
        for(let i = 1; i < step.length; i++){
            data = this.filters[step[i]](data)
        }

    }

    // return path value
    return path.not ? !data : data

}