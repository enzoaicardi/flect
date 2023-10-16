export let xcomment = document.createComment('')
export let xtemplate = document.createElement('template')
export let xfragment = document.createDocumentFragment()

export function createTemplate(html){

    // clone the template Element and inject innerHTML (for parsing)
    let template = xtemplate.cloneNode()
        template.innerHTML = html

    // return the template DocumentfFragment
    return template.content

}

export function getTemplate(){

    // get the template DocumentfFragment
    let template = this._xcache ? this._xcache.template : this._xclass._xtemplate

    // return the cloned template
    return template.cloneNode(true)

}

export function getBindingMap(){

    // return bindingMap from cache or class static
    return this._xcache || this._xclass._xmap

}