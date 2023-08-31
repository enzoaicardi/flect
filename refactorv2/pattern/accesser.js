export function getValueFromPattern(pattern, object){

    // if the base is equal to a data name
    if(pattern.datas[pattern.base]){
        return getValueFromPath(pattern.datas[pattern.base], object)
    }

    // replace all groups by their match
    return pattern.base.replace(xregex, (group) => {
        return getValueFromPath(pattern.datas[group], object)
    });

}

export function getValueFromPath(path, object = this._xdatas, merge = 0){

    // loop over steps but stop if value is falsy
    for(let x = 0; x < path.steps.length && !!object; x++){

        let step = path.steps[x]
        (x < merge--) || (object = object[step[0]])

        for(let i = 1; i < step.length; i++){

            object = this.filters[step[i]](object)

        }

    }

    return path.not ? !object : object

}