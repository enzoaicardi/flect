import { xregex } from "../utils/regex.js";
import { createPath } from "./path.js";

export function createPattern(str){

    let pattern = {datas: {}, base: str, attribute: ''}
    let datasMatches = str.match(xregex);

    if(!datasMatches){
        pattern.datas[str] = createPath(str)
    }

    else{
        for(let match of datasMatches){
            pattern.datas[match] = createPath(match.substring(1, match.length-1))
        }
    }

    return pattern

}

/*
    pattern = {
        attribute: "text",
        base: "My name is {user.name}",
        datas: {
            "{user.name}": path,
            "birth.date|toDate": path
        }
    }
*/