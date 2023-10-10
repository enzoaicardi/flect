import { fragment } from "./node.js"

export function xparse(html){
    let template = fragment.cloneNode()
        template.innerHTML = html
    return template
}