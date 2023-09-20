let styleRefIndex = 0
let styleSheet = false

export function createSelector(){
    return `[style-ref="${styleRefIndex++}"]`
}

export function createStylerules(content){

    if(!styleSheet){
        styleSheet = document.createElement('style')
        document.head.appendChild(styleSheet)
    }

    styleSheet.textContent += content;

}