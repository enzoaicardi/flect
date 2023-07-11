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

    getPath(str){
        return str.split('.');
    }

    access(path){
        let root = this._xdatas;
        for(let step of path){
            root = root[step];
            if(typeof root === 'undefined'){ break; }
        }
        return root;
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
        this.bindChilds(root);
    }

    bindChilds(root){
        let allElements = root.querySelectorAll(':scope > *');
        for(let element of allElements){
            this.bindElements(element);
        }
    }

    bindDatas(element){

        for(let attribute of element.attributes){

            if(attribute.name[0] === 'x' && attribute.name[1] === '-'){

                let name = attribute.name.substring(2);
                let path = this.getPath(attribute.value);
                let action = ()=>{ element.datas[name] = this.access(path); }

                if(!element._xdatas){
                    element._xdatas = {};
                }

                this.proxy.effect(path[0], element, action);

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
                let path = this.getPath(attribute.value);

                let action = ()=>{ element.setAttribute(name, this.access(path)); };

                if(name === 'text'){
                    action = ()=>{ element.textContent = this.access(path); };
                }
    
                else if(name === 'html'){
                    action = ()=>{ element.innerHTML = this.access(path); };
                }

                else if(name === 'append'){
                    action = ()=>{
                        let value = this.access(path);
                        if(!value){ return; }
                        if(value.length){ element.append(...value); }
                        else{ element.append(value); }
                    };
                }

                else if(name === 'prepend'){
                    action = ()=>{
                        let value = this.access(path);
                        if(!value){ return; }
                        if(value.length){ element.prepend(...value); }
                        else{ element.prepend(value); }
                    };
                }

                else if(name === 'toggle'){
                    action = ()=>{
                        let value = this.access(path);
                        element.classList.toggle(value, value);
                    };
                }
    
                else if(name === 'show'){
                    action = ()=>{ 
                        if(!this.access(path)){ element.style.display = 'none'; }
                        else{ element.style.removeProperty('display'); }
                    };
                }
    
                else if(name === 'if' || name === 'unless'){

                    action = ()=>{

                        let value = this.access(path);

                        if(!element._xjar){
                            element._xjar = document.createElement('div');
                            this.bindChilds(element);
                        }

                        let hasChild = element.childNodes.length;
                        
                        if(name === 'if'){
                            if(!!value && !hasChild){ this.cession(element._xjar, element); }
                            else if(!value && hasChild){ this.cession(element, element._xjar); }
                        }
                        else if(name === 'unless'){
                            if(!!value && hasChild){ this.cession(element, element._xjar); }
                            else if(!value && !hasChild){ this.cession(element._xjar, element); }
                        }

                    }

                }

                else if(name === 'for'){

                    const arrayName = attribute.value;

                    action = ()=>{

                        if(!element._xjarList){
                            element._xjarList = [];
                            element._xcount = 0;
                            element._xmodel = element.innerHTML;
                            element.innerHTML = '';
                        }

                        let array = this.access(path);
                        let isNumber = typeof array === 'number';
                        let elementName = element.getAttribute('var'); 

                        let length = isNumber ? array : array.length;
                        let gap = length - element._xcount;

                        if(gap > 0){

                            for(let x = 0; (x < element._xcount + gap) && x < length; x++){

                                if(x >= element._xcount){
                                    if(!element._xjarList[x]){
                                        let jar = xElement.clone(element._xmodel);

                                        this.replaceAttributes(jar, elementName, arrayName + '.' + x);
                                        jar.childNodes.forEach(node => { node._xindex = x; });
                                        
                                        this.bindChilds(jar);
                                        element._xjarList.push(jar);
                                    }
                                    this.cession(element._xjarList[x], element);
                                }

                            }

                        }
                        else if(gap < 0){

                            for(let x = element._xcount - 1; x >= 0; x--){

                                if(x > (element._xcount - 1) + gap){

                                    while(element.childNodes.length){
                                        let node = element.childNodes[element.childNodes.length-1];
                                        if(node._xindex !== x){ break; }
                                        element._xjarList[x].prepend(node);
                                    }

                                }
                            }

                        }

                        element._xcount += gap;

                    }

                }
                
                this.proxy.effect(path[0], element, action, this._xdatas[path[0]]);

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