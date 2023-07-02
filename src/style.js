let xStyleIndex = 0;
let scopedStyleSheet;

export default function scopedStyle(style){

    if(!scopedStyleSheet){
        scopedStyleSheet = document.createElement('style');
        scopedStyleSheet.id = 'x-scoped-stylesheet';
        document.head.appendChild(scopedStyleSheet);
    }

    let scopedName = 'x' + (xStyleIndex++);
    let scopedSelector = `[style-ref="${scopedName}"]`;

    scopedStyleSheet.textContent += style(scopedSelector);

    return scopedName;

}