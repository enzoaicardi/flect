/*

*/

import { xregex } from "../utils/utils-regex.js"

export function createPath(text){

    // split filters
    let steps = text.split('|')

    // get negative status
    let negative = steps[0][0] === '!'

    return {
        key: !negative ? steps[0] : (steps[0].substring(1)),
        steps: steps,
        negative: negative,
        lastIndex: steps.length-1
    }

}

export function createPattern(text, matches){

    let pattern = {
        paths: [],
        texts: [],
        isPattern: true
    }

    let index = 0

    for(let match of matches){

        let x = index
            index = text.indexOf(match, x)
        
        pattern.texts.push(text.substring(x, index))
        pattern.paths.push(createPath(match.substring(1, match.length-1)))

        index += match.length

    }

    pattern.texts.push(text.substring(index))

    return pattern

}

// return <Path|Pattern>
export function getPath(text){

    // get path matches
    let matches = text.match(xregex)

    // if 0 {pattern} found
    if(!matches){
        return createPath(text)
    }

    // if 1 or more {pattern} found
    return createPattern(text, matches)

}