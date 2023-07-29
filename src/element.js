import { proxyDatas, proxyIterable } from './proxy.js';
import { scopedStyle } from './style.js';

export default class xElement extends HTMLElement{

    static domParser = new DOMParser();

    static parse(html){
        return xElement.domParser.parseFromString(html, 'text/html').body;
    }

    constructor(){
        super();
        this._xrefs = {};
        this._xdatas = this._xdatas || {};
        this._xindex = this._xindex || false;
        this.custom = {};

        if(!this.hasAttribute('x-noinit')){
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
        let path = str.split('.');
        if(path[0][0] === '!'){
            path._xnot = true;
            path[0] = path[0].substring(1);
        };
        return path;
    }

    access(path){

        let root = this._xdatas;

        for(let step of path){
            root = root[step];
            if(typeof root === 'undefined'){ break; }
        }

        return path._xnot ? !root : root;
        
    }

    // setters

    setStaticDatas(){

        this._xdatas.body = [].slice.call(this.childNodes);
        this._xdatas.html = this.innerHTML;
        this._xdatas.text = this.textContent;

        for(let attribute of this.attributes){

            if(this.isXAttribute(attribute)){ continue; }

            if(attribute.name.substring(0, 6) === 'datas-'){

                let name = attribute.name.substring(6);
                let object = JSON.parse(attribute.value);
                this._xdatas[name] = object;

            }

            else{
                this._xdatas[attribute.name] = attribute.value;
            }

        }

    }

    setProxy(){
        this.proxy = proxyDatas();
        this.datas = new Proxy(this._xdatas, this.proxy);
    }

    joinPath(path){
        return (path._xnot ? '!' : '') + path.join('.');
    }

    addRef(name, element){
        if(!this._xrefs[name]){
            this._xrefs[name] = [];
        }
        this._xrefs[name].push(element);
    }

    iterable(dataName, iterableName){
        this._xdatas[iterableName] = new Proxy(this.datas, proxyIterable(dataName));
        this.effect(dataName, () => { this.proxy.run(iterableName, this._xdatas[dataName]); });
    }

    // builders

    build(){
        this.class.render.call(this, this.datas, this.buildDOM.bind(this), this.buildStyle.bind(this));
    }

    buildDOM(html){

        if(!html){
            return;
        }

        if(typeof html === 'string'){

            if(!this.class.template){
                this.class.template = xElement.parse(html);
            }

            this._xtemplate = this.class.template.cloneNode(true).childNodes;

        }

        else{
            this._xtemplate = this.class.template = html;
        }

        for(let node of this._xtemplate){

            if(node.nodeType === 1) {
                if(this.class.selector){
                    node.setAttribute('style-ref', this.class.selector);
                }
                this.bindElements(node);
            }

            node._xindex = this._xindex;

        }

        this.replaceWith(...this._xtemplate);

    }

    buildStyle(styleRender){
        if(!this.class.selector){
            if(!!this.class.template){
                throw `You must use style() before render() in x-${this.class.name} !`;
            }
            this.class.selector = scopedStyle(styleRender);
        }
    }

    // binders

    effect(dataName, action){
        this.proxy.effect(dataName, this, action, this._xdatas[dataName]);
    }

    rebindElements(root, oldData, newData){
        this.rebindElement(root, oldData, newData);

        if(!this.isXElement(root)){
            this.rebindChilds(root, oldData, newData);
        }
    }

    rebindChilds(root, oldData, newData){
        let childElements = root.children;

        for(let element of childElements){
            this.rebindElements(element, oldData, newData);
        }
    }

    rebindElement(root, oldData, newData){

        for(let attribute of root.attributes){

            if(this.isXAttribute(attribute)){
                let path = this.getPath(attribute.value);

                if(path[0] === oldData){
                    path[0] = newData;
                    root.setAttribute(attribute.name, this.joinPath(path));
                }
            }

        }

    }

    bindElements(root){
        this.bindElement(root);
        if(!this.isXElement(root)){
            this.bindChilds(root);
        }
    }

    bindChilds(root){
        let childElements = root.children;

        for(let element of childElements){
            this.bindElements(element);
        }
    }

    bindElement(element){

        if(!element._xbinded){

            element.component = this;
            element._xbinded = true;

            if(this.isXElement(element)){
                this.bindDatas(element);
            }
            else {
                this.bindAttributes(element);
            }

        }

    }

    bindDatas(element){

        for(let attribute of element.attributes){

            if(this.isXAttribute(attribute)){

                let name = attribute.name.substring(2);
                let path = this.getPath(attribute.value);
                let action = ()=>{ element.datas[name] = this.access(path); }

                if(!element._xdatas){
                    element.datas = element._xdatas = {};
                }

                element._xdatas[name] = this.access(path);
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

            if(this.isXAttribute(attribute)){

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
    
                else if(name === 'if'){

                    if(!element._xjar){
                        element._xjar = document.createElement('div');
                        this.bindChilds(element);
                    }

                    action = ()=>{

                        let value = this.access(path);
                        let hasChild = element.childNodes.length;
                        
                        if(name === 'if'){
                            if(!!value && !hasChild){ this.cession(element._xjar, element); }
                            else if(!value && hasChild){ this.cession(element, element._xjar); }
                        }

                    }

                }

                else if(name === 'for'){

                    const arrayName = attribute.value;
                    const itemName = element.getAttribute('var');

                    if(!element._xjarList){
                        element._xjarList = [];
                        element._xcount = 0;
                        element._xmodel = xElement.parse(element.innerHTML);
                        element.innerHTML = '';
                    }

                    action = ()=>{

                        let array = this.access(path);
                        if(typeof array === 'undefined'){ return; }
                        if(array._xiterable){ array = array.get; }

                        let isNumber = typeof array === 'number';

                        let length = isNumber ? array : array.length;
                        let gap = length - element._xcount;

                        if(gap > 0){

                            for(let x = element._xcount; (x < element._xcount + gap) && x < length; x++){

                                if(!element._xjarList[x]){
                                    let jar = element._xmodel.cloneNode(true);

                                    if(itemName){
                                        this.rebindChilds(jar, itemName, arrayName + '.' + x);
                                    }
                                    jar.childNodes.forEach(node => { node._xindex = x; });
                                    
                                    this.bindChilds(jar);
                                    element._xjarList.push(jar);
                                }
                                this.cession(element._xjarList[x], element);

                            }

                        }
                        else if(gap < 0){

                            for(let x = element._xcount - 1; (x > (element._xcount - 1) + gap) && x >= 0; x--){

                                while(element.childNodes.length){
                                    let node = element.childNodes[element.childNodes.length-1];
                                    if(node._xindex !== x){ break; }
                                    element._xjarList[x].prepend(node);
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

    // checks

    isXElement(element){
        return element.tagName[0] === 'X' && element.tagName[1] === '-';
    }

    isXAttribute(attribute){
        return attribute.name[0] === 'x' && attribute.name[1] === '-';
    }

}

customElements.define('x-element-prototype-factory', xElement);