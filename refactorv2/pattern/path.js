
export function createPath(str, matches = {}){

    let path = {
        not: str[0] === '!',
        steps: (str[0] === '!' ? str.substring(1) : str).split('.').map((el) => { return el.split('|') })
    }

    // check for matching property
    let match = matches[first(path)]

    // update dataName and reference
    path.dataName = first(match || path)
    path.steps[0].reference = match

    return path

}

/*
    path = {
        not: false,
        steps: [['birth' ~ reference], ['date', 'dateFormat']],
        dataName: 'user'
    }
*/

function first(path){
    return path.dataName || path.steps[0][0]
}