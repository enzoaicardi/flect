import proxyFactory from './proxy.js';

export default class xElement extends HTMLElement{

    static domParser = new DOMParser();

    constructor(){
        super();
        this._xelement = true;
        this._xrefs = {};
        this._xdatas = this._xdatas || {};

        if(!this.hasAttribute('noinit')){
            this.init();
        }
    }

    init(){
        this.setStaticDatas();
        this.setProxy();
        this.setDOM();
    }

    // getters

    ref(name){
        return this._xrefs[name] ? this._xrefs[name][0] : undefined;
    }

    refs(name){
        return this._xrefs[name];
    }

    // setters

    setStaticDatas(){

        this._xdatas.body = this.innerHTML;
        this._xdatas.childs = [].slice.call(this.childNodes);
        this._xdatas.content = this.textContent;

        for(let attribute of this.attributes){
            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){ continue; }
            this._xdatas[attribute.name] = attribute.value;
        }

    }

    setProxy(){
        this.proxy = proxyFactory();
        this.datas = new Proxy(this._xdatas, this.proxy);
    }

    setDOM(){
        this.class.render.call(this, this.datas, this.buildDOM.bind(this));
    }

    addRef(name, element){
        if(!this._xrefs[name]){
            this._xrefs[name] = [];
        }
        this._xrefs[name].push(element);
    }

    // builders

    buildDOM(html){

        if(!html){
            return;
        }

        if(!this.class.template){
            this.class.template = xElement.domParser.parseFromString(html, 'text/html');
        }

        const templateClone = this.class.template.cloneNode(true).body;
        const allElements = templateClone.querySelectorAll('*');

        for(let element of allElements){
            this.bindElement(element);
        }

        const rootElements = templateClone.childNodes;
        this.replaceWith(...rootElements);

    }

    // binders

    effect(variable, transformer){
        this.proxy.addEffect(variable, transformer);
    }

    bindElement(element){
        if(element.tagName[0] === 'X' && element.tagName[1] === '-'){
            this.bindDatas(element);
        }
        else {
            this.bindAttributes(element);
        }
    }

    bindDatas(element){

        for(let attribute of element.attributes){

            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){

                let name = attribute.name.substring(2);
                if(!element._xdatas){
                    element._xdatas = {};
                }

                element._xdatas[name] = this._xdatas[attribute.value];
                this.proxy.addBind('datas', attribute.value, element, name);

            }
            else if(attribute.name === 'datas'){
                // json parse + object.assign
            }
            else{
                // envoyer les données bruttes
            }

        }

    }

    bindAttributes(element){

        for(let x=0, i=0; x<element.attributes.length; x++, i++){

            let attribute = element.attributes[x];
            let remove = true;

            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){

                let name = attribute.name.substring(2);
                this.proxy.addBind('attributes', attribute.value, element, name);

            }

            else if(attribute.name === 'ref'){
                this.addRef(attribute.value, element);
            }

            else if(attribute.name === 'var'){
                element.xVar = attribute.value
            }

            else {
                remove = false;
            }

            if(remove){
                element.removeAttribute(attribute.name);
                x--;
            }

        }

    }

}

customElements.define('x-element-prototype-factory', xElement);