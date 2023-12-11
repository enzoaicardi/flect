/*
    classe qui etend HTMLelement avec son propre cycle de vie
    effectue une mise en cache de sa carté d'interactivité ainsi que de son template
    la mise en cache se prolonge grace à la carte d'intéractivité sur les modeles imbriqués.
*/

export class xElement extends HTMLElement {
    constructor() {
        super();
        /*
            this.cache - from other xElement templates
            this.datas - from self attributes
            this.static.render - from define
            this.static.template - from renderFunction
            this.static.map - from binding
        */
    }

    connectedCallback() {
        /*  ---> run this.static.render.connected() ?
            1 -> execute renderFunction(data, html) -> store result
            2 -> check if template ? template = interpreted result (bindmap) : template = template
            3 -> clone the template
            4 -> bind the template (use the bindmap)
            5 -> replace element in dom
        */
    }

    // we use this instead of disconnectedCallback because
    // the element is immediatly disconnected after being initialized
    disconnectCallback() {
        /*  ---> run this.static.render.disconnected() ?
            1 -> unbind the element reactivity
        */
    }

    render() {
        // use only render from static -> because cache does not include renderFunction
        // render...
    }
}
