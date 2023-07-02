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
        this.setProxy();
        this.setStaticDatas();
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

        this._xdatas.body = [].slice.call(this.childNodes);
        this._xdatas.html = this.innerHTML;
        this._xdatas.text = this.textContent;

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
        this.datas[name] = object;
        this.getDatasFromObject(name, object, (name, value) => { this.datas[name] = value; });
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
        this.bindChilds(this._xtemplate);

        const rootElements = this._xtemplate.childNodes;

        for(let node of rootElements){

            node._xindex = this._xindex;
            node.composite = this;

            if(this.class.style && node.nodeType === 1){
                node.setAttribute('style-ref', this.class.style);
            }
        }

        this.replaceWith(...rootElements);

    }

    // binders

    effect(dataName, action){
        this.proxy.effect(dataName, this, action, this._xdatas[dataName]);
    }

    replaceAttributes(root, oldName, newName){
        let allElements = root.querySelectorAll('*');
        for(let element of allElements){
            for(let attribute of element.attributes){
                if(attribute.name[0] === 'x' && attribute.name[1] === '-' && attribute.value === oldName){
                    element.setAttribute(attribute.name, newName);
                }
            }
        }
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
        this.bindElement(root);
        let allElements = root.querySelectorAll(':scope > *');
        for(let element of allElements){
            this.bindElements(element);
        }
    }

    bindChilds(root){
        let allElements = root.querySelectorAll(':scope > *');
        for(let element of allElements){
            this.bindElements(element);
        }
    }

    bindData(element, dataName, mirrorName){
        let action = (value, item)=>{ item.datas[mirrorName] = value; }
        this.proxy.effect(dataName, element, action, this._xdatas[dataName]);
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

                else if(name === 'append'){
                    action = (value, item)=>{
                        if(value.length){ item.append(...value); }
                        else{ item.append(value); }
                    };
                }

                else if(name === 'prepend'){
                    action = (value, item)=>{
                        if(value.length){ item.prepend(...value); }
                        else{ item.prepend(value); }
                    };
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
    
                else if(name === 'if' || name === 'unless'){

                    action = (value, item)=>{

                        if(!item._xjar){
                            item._xjar = document.createElement('div');
                        }

                        let hasChild = item.childNodes.length;
                        
                        if(name === 'if'){
                            if(!!value && !hasChild){ this.cession(item._xjar, item); }
                            else if(!value && hasChild){ this.cession(item, item._xjar); }
                        }
                        else if(name === 'unless'){
                            if(!!value && hasChild){ this.cession(item, item._xjar); }
                            else if(!value && !hasChild){ this.cession(item._xjar, item); }
                        }

                    }

                }

                else if(name === 'for'){

                    const arrayName = attribute.value;

                    action = (array, item)=>{

                        if(!item._xjarList){
                            item._xjarList = [];
                            item._xcount = 0;
                            item._xmodel = document.createElement('div');
                            this.cession(item, item._xmodel);
                        }

                        let isNumber = typeof array === 'number';
                        let itemName = isNumber ? false : item.getAttribute('var'); 
                        let length = isNumber ? array : array.length;
                        let gap = length - item._xcount;

                        if(gap > 0){
                            for(let x = 0; (x < item._xcount + gap) && x < length; x++){

                                if(itemName) {
                                    this.datas[arrayName + '.' + x] = array[x];
                                }

                                if(x >= item._xcount){

                                    if(!item._xjarList[x]){
                                        let jar = item._xmodel.cloneNode(true);

                                        if(itemName) { this.replaceAttributes(jar, itemName, arrayName + '.' + x); }
                                        jar.childNodes.forEach(node => { node._xindex = x; });
                                        
                                        this.bindChilds(jar);
                                        item._xjarList.push(jar);
                                    }

                                    this.cession(item._xjarList[x], item);
                                }

                            }
                        }
                        else if(gap < 0){
                            for(let x = item._xcount - 1; (x > (item._xcount - 1) + gap) && x >= 0; x--){
                                while(item.childNodes.length){
                                    let node = item.childNodes[item.childNodes.length-1];
                                    if(node._xindex !== x){ break; }
                                    item._xjarList[x].prepend(node);
                                }
                            }
                        }

                        item._xcount += gap;

                    }

                }
                
                this.proxy.effect(attribute.value, element, action, this._xdatas[attribute.value]);

            }

            else if(attribute.name === 'ref'){
                this.addRef(attribute.value, element);
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