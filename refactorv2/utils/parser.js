import { fragment } from "./node.js"

export let xparser = new DOMParser()

export function xparse(html){
    let template = fragment.cloneNode()
        template.append(...xparser.parseFromString(html, 'text/html').body.childNodes)
    return template
}