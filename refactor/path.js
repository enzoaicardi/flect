import { xregex } from "./assets.js";

export function getMatch(value, alter){

    let paths = {};
    let matchs = value.match(xregex);

    // if we have a single path "dataName"
    if(!matchs){
        paths[value] = getPath(value, alter)
        return {paths, path: paths[value]}
    }

    else{
        // if we have matches "Hello {dataName} !"
        for(let match of matchs){
            if(!paths[match]){
                paths[match] = getPath(match.substring(1, match.length-1), alter)
            }
        }
    }

    return {paths, value}

}

export function getPath(str, alter){

    // split sections "dataName|filter"
    let sections = str.split('|')

    // split path "item.name"
    let path = sections[0].split('.')
        path.xfilters = sections

    // check if path get negative assignment
    if(path[0][0] === '!'){
        path.xnot = '!'
        path[0] = path[0].substring(1)
    }

    // change path dataName
    if(alter && alter[path[0]]){
        path.splice(0, 1, ...alter[path[0]][0], alter[path[0]][1])
    }

    return path

}

export function getData(path){

    let datas = this._xdatas

    for(let x = 0; !!datas && x < path.length; x++){
        datas = datas[path[x]]
    }

    let result = path.xnot ? !datas : datas

    for(let x = 1; x < path.xfilters.length; x++){
        result = this.getFilter(path.xfilters[x])(result)
    }

    return result
    
}

export function getValue(match){
    
    if(match.path){
        return this.getData(match.path)
    }

    return match.value.replace(xregex, (group) => {
        return this.getData(match.paths[group])
    });

}

export function getFilter(name){
    return this._xfilters[name] || (()=>{})
}