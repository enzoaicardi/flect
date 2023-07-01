let xStyleIndex = 0;
let scopedStyleSheet;

export default function scopedStyle(style){

    if(!scopedStyleSheet){
        scopedStyleSheet = document.createElement('style');
        scopedStyleSheet.id = 'x-scoped-stylesheet';
        document.head.appendChild(scopedStyleSheet);
    }

    let scopedName = 'x' + (xStyleIndex++);

    for(let rule in style){
        scopedStyleSheet.textContent += `[style-ref="${scopedName}"] ${rule}${style[rule]}`;
    }

    return scopedName;

}