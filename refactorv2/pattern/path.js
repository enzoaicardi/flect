
export function createPath(str){

    return {
        not: str[0] === '!',
        steps: (str[0] === '!' ? str.substring(1) : str).split('.').map((el) => { return el.split('|') })
    }

}

/*
    path = {
        steps: [['birth'], ['date', 'dateFormat']],
        not: false
    }
*/