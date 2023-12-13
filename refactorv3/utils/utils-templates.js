export let xcomment = document.createComment("");
export let xtemplate = document.createElement("template");
export let xfragment = document.createDocumentFragment();

export function createTemplate(html) {
    // clone the template Element and inject innerHTML (for parsing)
    let template = xtemplate.cloneNode();
    template.innerHTML = html;

    // return the template DocumentfFragment
    return template.content;
}

export function asTemplate(node) {
    let template = xfragment.cloneNode();
    template.append(...node.childNodes);

    return template;
}
