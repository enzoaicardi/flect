
export function createPath(str, matches = {}){

    let path = {
        not: str[0] === '!',
        steps: (str[0] === '!' ? str.substring(1) : str).split('.').map((el) => { return el.split('|') })
    }

    let match = matches[first(path)]
        match && (match.ref.push(mergePaths(match.path, path)))

    // todo remove console
    // console.log('path > ', str, match?.ref)

    return path

}

/*
    path = {
        not: false,
        steps: [['birth'], ['date', 'dateFormat']],
        dynamic: false
    }
*/

export function mergePaths(source, target){
    target.steps.unshift(...source.steps)
    return target.steps[source.steps.length]
}

/*
    item ~> products
    source: [['products']]
    target: [['item'], ['name']]
    merged: [['products'], ['item' ~ dynamic index], ['name']]
    dynamic: ['item' ~ dynamic index]
*/

function first(path, index = 0){
    return path.steps[index][0]
}