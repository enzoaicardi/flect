
export function createPath(str, matches = {}){

    let path = {
        not: str[0] === '!',
        steps: (str[0] === '!' ? str.substring(1) : str).split('.').map((el) => { return el.split('|') })
    }

    let match = matches[first(path)]
        match && (match.ref.push(mergePaths(match.path, path)))
    // todo ne peut pas fonctionner, il faut ajouter la référence a une liste
    // la liste doit être accessible depuis le modificateur (donc la bindmap en question)
    // qui doit pouvoir modifier à la volée les références
    // a voir si c'est necessaire de passer par des clones ou pas (preférer sans)
    // path.dynamic = matches[first(path)] && (mergePaths(matches[first(path)], path))
    console.log(str, match)

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