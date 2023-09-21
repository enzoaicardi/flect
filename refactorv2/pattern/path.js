
export function createPath(str, matches = {}){

    let path = {
        not: str[0] === '!',
        steps: (str[0] === '!' ? str.substring(1) : str).split('.').map((el) => { return el.split('|') })
    }

    let match = matches[first(path)]
        match && (match.references.push(mergePaths(match.path, path)))

    // todo remove console
    // console.log('path > ', str, match?.references)

    return path

}

/*
    path = {
        not: false,
        steps: [['birth'], ['date', 'dateFormat']],
        references: false
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
    merged: [['products'], ['item' ~ references index], ['name']]
    references: ['item' ~ references index]
*/

function first(path, index = 0){
    return path.steps[index][0]
}