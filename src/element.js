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
        // - le clear pose probleme uniquement pour le for qui créer plusieurs elements a la volée, alors
        //   que dans le cas d'un if on part du principe que l'élément est deja rendu, pour un for le nombre est impredictible
        // - bind data au niveau global ?
        // - bind data au niveau block ?
        // - ou alors for et if encapsulent leur elements et les delete du dom + heritent des datas du parent ? (enfin plutot le parent les donne)

        for(let element of allElements){
            this.bindElement(element);
        }

        const rootElements = templateClone.children;
        this.replaceWith(...rootElements);

    }

    // binders

    effect(variable, transformer){
        // bind une valeur à une autre valeur
        // todo :

        // cascade('count', (value ?)=>this.isCount = true)
        // data.isCount -> changements automatiques dans tout les cas
    }

    bindElement(element){
        if(element.isXElement){
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
            let remove = true;

            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){

                let name = attribute.name.substring(2);
                this.proxy.effect('attributes', attribute.value, element, name);

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

/*
    Trois choses a prendre en compte
    - attribute binding (x-class x-type ...)
    - property binding (x-text x-html)
    - data bindind (datas data-...)

    datas.content (recupère le text de l'élément)
    datas.body (recupère le htmlcontent de l'élément)

    supprimer les attributs relatifs a data binding et property binding pour plus de clarté
*/