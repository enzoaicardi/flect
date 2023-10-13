/*
    Only apply filters because value is sent by the proxy object throught effects
*/

export function getPathValue(value, path){

    if(path.lastIndex){
        // apply path filters (n+1)
        for(let x = 1; x < path.lastIndex; x++){
            value = path.steps[x](value)
        }
    }

    // return final value (with negative status)
    return path.negative ? !value : value

}