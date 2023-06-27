import dataProxyManager from './proxy.js';

export default class xElement extends HTMLElement{

    static domParser = new DOMParser();

    class = xElement;

    constructor(){

        super();
        this.isXElement = true;
        this._datas = {};

        this.setStaticDatas();
        this.setProxy();
        this.setTemplate();
        this.buildDOM();

        // analyse dom
        // chaque element :
        //      analyse attribut
        //      si .isXElement = databinding
        //      sinon attribut binding ou property binding

    }

    setStaticDatas(){
        for(let attribute of this.attributes){
            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){ continue; }
            this._datas[attribute.name] = attribute.value;
        }
    }

    setProxy(){
        this.datas = new Proxy(this._datas, dataProxyManager);
    }

    setTemplate(){
        if(!this.class.template){
            const html = this.class.render(this.datas);
            this.class.template = xElement.domParser.parseFromString(html, 'text/html');
        } else {
            this.class.render(this.datas);
        }
    }

    buildDOM(){
        const templateClone = this.class.template.cloneNode(true);
        const allElements = templateClone.querySelectorAll('*');

        for(let element of allElements){
            //  analyse attribut
            //      si .isXElement = databinding
            //      sinon attribut binding ou property binding
        }

        // replaceWith(root1, root2, root3)
    }
}

customElements.define('x-element-prototype-factory', xElement);

/*
    Trois choses a prendre en compte
    - attribute binding (x-class x-type ...)
    - property binding (x-text x-html)
    - data bindind (datas data-...)

    datas.content (recupère le text de l'élément)
    datas.body (recupère le htmlcontent de l'élément)

    supprimer les attributs relatifs a data binding et property binding pour plus de clarté
*/