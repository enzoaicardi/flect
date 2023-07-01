import proxyFactory from './proxy.js';

export default class xElement extends HTMLElement{

    static domParser = new DOMParser();

    constructor(){
        super();
        this._xelement = true;
        this._xrefs = {};
        this._xdatas = this._xdatas || {};
        this._xindex = this._xindex || false;

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

    getDatasFromObject(path, object, hook){

        if(typeof object === 'string'){
            return false;
        }

        for(let key in object){

            var fill = true;
            let name = path + '.' + key;

            if(!this.getDatasFromObject(name, object[key], hook)){
                hook(name, object[key]);
            }

        }

        return fill || false;

    }

    // setters

    setStaticDatas(){

        this._xdatas.body = this.innerHTML;
        this._xdatas.childs = [].slice.call(this.childNodes);
        this._xdatas.content = this.textContent;

        for(let attribute of this.attributes){

            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){ continue; }

            if(attribute.name.substring(0, 6) === 'datas-'){

                let name = attribute.name.substring(6);
                let object = JSON.parse(attribute.value);

                this.flat(name, object);

            }

            else{
                this._xdatas[attribute.name] = attribute.value;
            }

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

    flat(name, object){
        this._xdatas[name] = object;
        this.getDatasFromObject(name, object, (name, value) => { this._xdatas[name] = value; });
    }

    // builders

    buildDOM(html){

        if(!html){
            return;
        }

        if(!this.class.template){
            this.class.template = xElement.domParser.parseFromString(html, 'text/html');
        }

        this._xtemplate = this.class.template.cloneNode(true).body;
        this.bindElements(this._xtemplate);

        const rootElements = this._xtemplate.childNodes;

        for(let node of rootElements){

            node._xindex = this._xindex;
            node.composite = this;

            if(this.class.style && node.nodeType === 1){
                console.log(node);
                node.setAttribute('style-ref', this.class.style);
            }
        }

        this.replaceWith(...rootElements);

    }

    // binders

    effect(dataName, action){
        this.proxy.effect(dataName, this, action);
    }

    bindElement(element){
        if(element.tagName[0] === 'X' && element.tagName[1] === '-'){
            this.bindDatas(element);
        }
        else {
            this.bindAttributes(element);
        }
    }

    bindElements(root){
        let allElements = root.querySelectorAll('*');
        for(let element of allElements){
            this.bindElement(element);
        }
    }

    bindData(element, dataName, mirrorName){

        let action = (value, item)=>{ item.datas[mirrorName] = value; }

        element._xdatas[mirrorName] = this._xdatas[dataName];
        this.proxy.effect(dataName, element, action);

    }

    bindDatas(element){

        for(let attribute of element.attributes){

            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){

                let name = attribute.name.substring(2);

                if(!element._xdatas){
                    element._xdatas = {};
                }

                if(name.substring(0, 6) === 'datas-'){
                    name = name.substring(6);
                    this.getDatasFromObject('', this._xdatas[attribute.value], (prop) => {
                        this.bindData(element, attribute.value + prop, name + prop);
                    });
                }

                this.bindData(element, attribute.value, name);

            }

        }

    }

    bindAttributes(element){

        for(let x=0, i=0; x<element.attributes.length; x++, i++){

            let attribute = element.attributes[x];
            let remove = true;

            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){

                let name = attribute.name.substring(2);
                let action = (value, item) => { item.setAttribute(name, value); };

                if(name === 'text'){
                    action = (value, item)=>{ item.textContent = value; };
                }
    
                else if(name === 'html'){
                    action = (value, item)=>{ item.innerHTML = value; };
                }

                else if(name === 'toggle'){
                    action = (value, item)=>{ item.classList.toggle(value, value); };
                }
    
                else if(name === 'show'){
                    action = (value, item)=>{ 
                        if(!value){ item.style.display = 'none'; }
                        else{ item.style.removeProperty('display'); }
                    };
                }
    
                else if(name === 'if'){

                    action = (value, item)=>{

                        if(!item._xjar){
                            item._xjar = document.createElement('div');
                        }

                        let hasChild = item.childNodes.length;
                        if(!!value && !hasChild){ this.cession(item._xjar, item); }
                        if(!value && hasChild){ this.cession(item, item._xjar); }

                    }

                }

                else if(name === 'for'){

                    action = (array, item)=>{

                        if(!item._xjarList){
                            item._xjarList = [];
                            item._xcount = 0;
                            item._xmodel = document.createElement('div');
                            this.cession(item, item._xmodel);
                        }

                        let gap = array.length - item._xcount;

                        if(gap > 0){
                            for(let x = item._xcount; x < item._xcount + gap; x++){
                                if(!item._xjarList[x]){
                                    let jar = item._xmodel.cloneNode(true);
                                    jar.childNodes.forEach(node => node._xindex = x);
                                    this.bindElements(jar);
                                    item._xjarList.push(jar);
                                }
                                this.cession(item._xjarList[x], item);
                            }
                        }
                        else if(gap < 0){
                            for(let x = item._xcount - 1; x > (item._xcount - 1) + gap; x--){
                                while(item.childNodes.length){
                                    let node = item.childNodes[item.childNodes.length-1];
                                    if(node._xindex !== x){ break; }
                                    item._xjarList[x].appendChild(node);
                                }
                            }
                        }

                        item._xcount += gap;

                    }

                }
                
                action(this._xdatas[attribute.value], element);
                this.proxy.effect(attribute.value, element, action);

            }

            else if(attribute.name === 'ref'){
                this.addRef(attribute.value, element);
            }

            else if(attribute.name === 'var'){
                element._xvar = attribute.value
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

    cession(giver, reciever){
        while(giver.childNodes.length){
            let node = giver.childNodes[0];
            reciever.appendChild(node);
        }
    }

}

customElements.define('x-element-prototype-factory', xElement);