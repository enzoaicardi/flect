/* xElement {
    getValue = getValueFromPattern
    getData = getValueFromPath
} */

import { xregex } from "../utils/regex.js";

export function getValueFromPattern(pattern){

    // if the base is equal to a data name
    if(pattern.datas[pattern.base]){
        return this.getData(pattern.datas[pattern.base])
    }

    // replace all groups by their match
    return pattern.base.replace(xregex, (group) => {
        return this.getData(pattern.datas[group])
    });

}

export function getValueFromPath(path){

    let data = this._xdatas

    // loop over steps but stop if value is falsy
    for(let x = 0; x < path.steps.length && !!data; x++){

        // set the new step
        let step = path.steps[x]
            data = data[step[0]]

        // apply filters if exists
        for(let i = 1; i < step.length; i++){
            data = this.filters[step[i]](data)
        }

    }

    // return path value
    return path.not ? !data : data

}