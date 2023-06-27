import dataProxyManager from './proxy.js';

export default class xElement extends HTMLElement{
    constructor(){
        super();
        this._datas = {};
        this.datas = new Proxy(this._datas, dataProxyManager);
        // ajouter le proxy
        // rendre le html en template

        console.log('hello');
    }
}

customElements.define('x-element-prototype-factory', xElement);

/*
    Trois choses a prendre en compte
    - attribute binding (x-class x-type ...)
    - property binding (x-text x-html)
    - data bindind (datas data-...)

    supprimer les attributs relatifs a data binding et property binding pour plus de clarté
*/