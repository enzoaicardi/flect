import proxyFactory from './proxy.js';

export default class xElement extends HTMLElement{

    static domParser = new DOMParser();

    constructor(){
        super();
        this.isXElement = true;
        this.init();
    }

    init(){
        this._datas = {};
        this.setStaticDatas();
        this.setProxy();
        this.setDOM();
    }

    setStaticDatas(){
        for(let attribute of this.attributes){
            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){ continue; }
            this._datas[attribute.name] = attribute.value;
        }
    }

    setProxy(){
        this.proxy = proxyFactory();
        this.datas = new Proxy(this._datas, this.proxy);
    }

    setDOM(){
        this.class.render.call(this, this.datas, this.buildDOM.bind(this));
    }

    buildDOM(html){

        if(!html){
            return;
        }

        if(!this.class.template){
            this.class.template = xElement.domParser.parseFromString(html, 'text/html');
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

        const rootElements = templateClone.querySelectorAll(':scope > *');
        this.replaceWith(...rootElements);

    }

    bindDatas(element){

        for(let attribute of element.attributes){

            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){
                let name = attribute.name.substring(2);
                // observer les changements avec getter
            }
            else{
                // envoyer les données bruttes
            }

        }

    }

    bindAttributes(element){

        for(let attribute of element.attributes){

            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){

                let name = attribute.name.substring(2);

                if(name === 'text'){

                }
                else if(name === 'html'){

                }
                else{
                    const pair = [element, name];
                    // todo obtenir le nom de la variable a observer
                    this.proxy.addPair('attributes', name, pair);
                    this.removeAttribute(attribute.name);
                }
                // observer les changements avec getter
            }

            else if(attribute.name === 'ref'){
                // ajouter la référence
            }

        }

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