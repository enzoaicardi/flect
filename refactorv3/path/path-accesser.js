/*
    Only apply filters because value is sent by the proxy object throught effects
*/

export function getPathValue(value, path){

    // if there is filters
    if(path.lastIndex){

        // apply path filters (n+1)
        for(let x = 1; x < path.lastIndex; x++){

            // get current filter
            let step = path.steps[x]
                value = step[0](value)

            // access filter properties
            for(let xb = 1; xb < step.length; xb++){
                value = value[step[xb]]
            }

        }
    }

    // return final value (with negative status)
    return path.negative ? !value : value

}

export function getPatternValue(value, pattern, key){

    // setup the first value
    let string = pattern.texts[0]

    // explore all path
    for(let x = 0; x < pattern.paths.length; x++){

        let path = pattern.paths[x]
        let text = pattern.texts[x+1]

        // update path value in memory
        if(path.key === key){
            path.value = getPathValue(value, path)
        }

        // update text value
        string += (path.value || '') + text

    }

    // return value is allways <string>
    return string

}