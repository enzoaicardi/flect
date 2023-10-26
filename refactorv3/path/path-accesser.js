/*
    Only apply filters because value is sent by the proxy object throught effects
*/

export function getPathValue(value, path){

    if(path.lastIndex){
        // apply path filters (n+1)
        // TODO -> path filtres + propriétés doit etre possible, mais seul chemin avant doit etre conservé comme nom
        for(let x = 1; x < path.lastIndex; x++){
            value = path.steps[x](value)
        }
    }

    // return final value (with negative status)
    return path.negative ? !value : value

}

export function getPatternValue(value, pattern, key){

    // setup the first value
    let text = pattern.text[0]

    // explore all path
    for(let x = 0; x < pattern.paths.length; x++){

        let path = pattern.paths[x]

        // update path value in memory
        if(path.key === key){
            path.value = getPathValue(value)
        }

        // update text value
        text += path.value || ''

    }

    // return value is allways <string>
    return text

}