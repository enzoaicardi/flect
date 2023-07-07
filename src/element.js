import proxyFactory from './proxy.js';
import scopedStyle from './style.js';

export default class xElement extends HTMLElement{

    static domParser = new DOMParser();
    
    static clone = function(html){
        return xElement.domParser.parseFromString(html, 'text/html').body;
    }

    constructor(){
        super();
        this._xelement = true;
        this._xrefs = {};
        this._xdatas = this._xdatas || {};
        this._xindex = this._xindex || false;
        this.custom = {};

        if(!this.hasAttribute('noinit')){
            this.init();
        }
    }

    init(){
        this.setProxy();
        this.setStaticDatas();
        this.build();
    }

    // getters

    ref(name){
        return this._xrefs[name] ? this._xrefs[name][0] : undefined;
    }

    refs(name){
        return this._xrefs[name];
    }

    getDatasFromObject(path, object, hook){

        hook(path, object);

        if(typeof object === 'string'){
            return false;
        }

        for(let key in object){
            let name = path + '.' + key;
            this.getDatasFromObject(name, object[key], hook);
        }

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

    addRef(name, element){
        if(!this._xrefs[name]){
            this._xrefs[name] = [];
        }
        this._xrefs[name].push(element);
    }

    flat(name, object = false){
        if(!object){ object = this._xdatas[name]; }
        this.getDatasFromObject(name, object, (name, value) => { this.datas[name] = value; });
    }

    // builders

    build(){
        this.class.render.call(this, this.datas, this.buildDOM.bind(this), this.buildStyle.bind(this));
    }

    buildDOM(html){

        if(!html){
            return;
        }

        if(!this.class.template){
            
            this.class.template = xElement.clone(html);
            
            if(!!this.class.style){
                let selector = scopedStyle(this.class.style);
                let childs = this.class.template.querySelectorAll(':scope > *');
                for(let element of childs){ element.setAttribute('style-ref', selector); }
            }

        }

        this._xtemplate = this.class.template.cloneNode(true);
        this.bindChilds(this._xtemplate);

        const rootElements = this._xtemplate.childNodes;
        for(let node of rootElements){ node._xindex = this._xindex; }

        this.replaceWith(...rootElements);

    }

    buildStyle(styleRender){
        if(!this.class.style && !!this.class.template){
            throw `You should render style before DOM !`;
        }
        if(!this.class.style){
            this.class.style = styleRender;
        }
    }

    // binders

    effect(dataName, action){
        this.proxy.effect(dataName, this, action, this._xdatas[dataName]);
    }

    replaceAttributes(root, oldName, newName){
        let allElements = root.querySelectorAll('*');
        for(let element of allElements){
            for(let attribute of element.attributes){
                if(attribute.name[0] === 'x' && attribute.name[1] === '-'){
                    if(attribute.value.startsWith(oldName + '.')){
                        element.setAttribute(attribute.name, newName + attribute.value.substring(oldName.length));
                    }
                    else if(attribute.value === oldName){
                        element.setAttribute(attribute.name, newName);
                    }
                }
            }
        }
    }

    bindElement(element){
        if(!element._xbinded){
            element.component = this;
            element._xbinded = true;
            if(element.tagName[0] === 'X' && element.tagName[1] === '-'){
                this.bindDatas(element);
            }
            else {
                this.bindAttributes(element);
            }
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
        element._xdatas[mirrorName] = this._xdatas[dataName];
        let action = (value, item)=>{ item.datas[mirrorName] = value; }
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
                    this.getDatasFromObject('', this._xdatas[attribute.value], (prop, value) => {
                        this.datas[attribute.value + prop] = value;
                        this.bindData(element, attribute.value + prop, name + prop);
                    });
                }

                this.bindData(element, attribute.value, name);

            }

            else if(attribute.name === 'ref'){
                this.addRef(attribute.value, element);
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
                            this.bindChilds(item);
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
                            item._xmodel = item.innerHTML;
                            item.innerHTML = '';
                        }

                        let isNumber = typeof array === 'number';
                        let itemName = item.getAttribute('var'); 
                        let length = isNumber ? array : array.length;
                        let gap = length - item._xcount;
                        this.datas[arrayName + '.length'] = length;

                        if(gap > 0){
                            for(let x = item._xcount; (x < item._xcount + gap) && x < length; x++){
                                if(!item._xjarList[x]){
                                    let jar = xElement.clone(item._xmodel);

                                    this.replaceAttributes(jar, itemName, arrayName + '.' + x);
                                    jar.childNodes.forEach(node => { node._xindex = x; });
                                    
                                    this.bindChilds(jar);
                                    item._xjarList.push(jar);
                                }
                                this.cession(item._xjarList[x], item);
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

                        while(length--){
                            let x = length;
                            this.datas[arrayName + '.' + x] = isNumber ? x : array[x];
                            this.datas[arrayName + '.' + x + '.index'] = x;
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