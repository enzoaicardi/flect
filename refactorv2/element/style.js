let styleRefIndex = 0
let styleSheet = false

export let STYLE_ATTRIBUTE = 'style-ref'

export function createStylerules(render){

    let selector = 'x' + (styleRefIndex++)

    if(!styleSheet){
        styleSheet = document.createElement('style')
        document.head.appendChild(styleSheet)
    }

    styleSheet.textContent += render(`[${STYLE_ATTRIBUTE}="${selector}"]`);

    return selector

}