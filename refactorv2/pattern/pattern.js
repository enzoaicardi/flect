import { xregex } from "../../refactor/assets.js";
import { createPath } from "./path.js";

export function createPattern(str){

    let pattern = {datas: {}, base: str}
    let datasMatches = str.match(xregex);

    if(!datasMatches){
        pattern.datas[str] = createPath(str)
    }

    else{
        for(let match of datasMatches){
            match = match.substring(1, match.length-1)
            pattern.datas[match] = createPath(match)
        }
    }

    return pattern

}