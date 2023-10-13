/*
    explain...
*/

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