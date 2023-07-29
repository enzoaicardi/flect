let xStyleIndex = 0;
let scopedStyleSheet;

function scopedName(){
    let scopedName = 'x' + (xStyleIndex++);    
    return scopedName;
}

export function scopedStyle(styleRender){

    let name = scopedName();

    if(!scopedStyleSheet){
        scopedStyleSheet = document.createElement('style');
        scopedStyleSheet.id = 'x-scoped-stylesheet';
        document.head.appendChild(scopedStyleSheet);
    }

    let scopedSelector = `[style-ref="${name}"]`;
        scopedStyleSheet.textContent += styleRender(scopedSelector);

    return name;

}