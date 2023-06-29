import proxyFactory from './proxy.js';

export default class xElement extends HTMLElement{

    static domParser = new DOMParser();

    constructor(){
        super();
        this.isXElement = true;
        if(!this.hasAttribute('noinit')){
            this.init();
        }
    }

    init(){
        this._refs = {};
        this._datas = {};
        this.setStaticDatas();
        this.setProxy();
        this.setDOM();
    }

    // getters

    ref(name){
        return this._refs[name] ? this._refs[name][0] : undefined;
    }

    refs(name){
        return this._refs[name];
    }

    // setters

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

    addRef(name, element){
        if(!this._refs[name]){
            this._refs[name] = [];
        }
        this._refs[name].push(element);
    }

    // builders

    buildDOM(html){

        if(!html){
            return;
        }

        if(!this.class.template){
            this.class.template = xElement.domParser.parseFromString(html, 'text/html');
        }

        const templateClone = this.class.template.cloneNode(true);
        const allElements = templateClone.querySelectorAll('*');

        // todo :
        // - un bind par element
        // - chaue element ajouté = bind (permet if et for) pour clear le proxy
        // - ajouter un event pour ondelete afin de unbind pour clear le proxy
        // - certainement revoir le proxy avec un map ayant un element comme clé permet de clear facilement le proxy comme ça
        // - bind data au niveau global ?
        // - bind data au niveau block ?
        // - ou alors for et if encapsulent leur elements et les delete du dom + heritent des datas du parent ? (enfin plutot le parent les donne)

        for(let element of allElements){
            if(element.isXElement){
                this.bindDatas(element);
            }
            else {
                this.bindAttributes(element);
            }
        }

        const rootElements = templateClone.children;
        this.replaceWith(...rootElements);

    }

    // binders

    bind(emitter, reciever, transformer){
        // bind une valeur à une autre valeur
    }

    bindDatas(element){

        for(let attribute of element.attributes){

            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){
                let name = attribute.name.substring(2);
                // observer les changements avec getter
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

            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){

                let name = attribute.name.substring(2);

                const pair = [name, element];
                this.proxy.addPair('attributes', attribute.value, pair);
                element.removeAttribute(attribute.name);
                x--;

            }

            else if(attribute.name === 'ref'){
                this.addRef(attribute.value, element);
            }

            else {

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