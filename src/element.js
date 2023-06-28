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
        this.setDOM();

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

    setDOM(){
        this.class.render(this.datas, this.buildDOM);
    }

    buildDOM(html){

        if(!html){
            return;
        }

        if(!this.class.template){
            this.class.template = xElement.domParser.parseFromString('text/html');
        }

        const templateClone = this.class.template.cloneNode(true);
        const allElements = templateClone.querySelectorAll('*');

        for(let element of allElements){
            if(element.isXElement){
                this.bindDatas(element);
            }
            else {
                this.bindAttributes(element);
            }
        }

        // replaceWith(root1, root2, root3)
    }

    bindDatas(element){
        // datas binding
    }

    bindAttributes(element){
        // attributes binding
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