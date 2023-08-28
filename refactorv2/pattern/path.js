
export function createPath(str){

    let path = {}

    let sections = str.split('|')
    let steps = sections[0].split('.')
    
    path.filters = sections.slice(1)
    path.not = steps[0][0] === '!'
    path.steps = steps

    if(path.not){ steps[0] = steps[0].substring(1) }

    return path

}

/*
    path = {
        steps: ['birth', 'date'],
        filters: ['toDate'],
        not: false
    }
*/