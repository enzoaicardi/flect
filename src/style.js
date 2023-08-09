let scopedIndex = 0;
let scopedStyleSheet;

export function scopedStyle(styleRender){

    let name = 'x' + (scopedIndex++);

    if(!scopedStyleSheet){
        scopedStyleSheet = document.createElement('style');
        scopedStyleSheet.id = 'x-stylesheet';
        document.head.appendChild(scopedStyleSheet);
    }

    let scopedSelector = `[style-ref="${name}"]`;
        scopedStyleSheet.textContent += styleRender(scopedSelector);

    return name;

}