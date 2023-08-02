import { proxyDatas, proxyIterable } from './proxy.js';
import { scopedStyle } from './style.js';

export default class xElement extends HTMLElement{

    constructor(){
        super();
        this._xrefs = {};
        this._xdatas = this._xdatas || {};
        this.custom = {};
        this.init();
    }

    init(){
        this.setProxy();
        this.setDatas();
        this.build();
    }

    // getters

    ref(name){
        return this._xrefs[name] ? this._xrefs[name][0] : undefined;
    }

    refs(name){
        return this._xrefs[name];
    }

    getPath(str, alter){
        let path = str.split('.');
        if(path[0][0] === '!'){
            path._xnot = true;
            path[0] = path[0].substring(1);
        }
        if(alter && alter[path[0]]){
            path.splice(0, 1, ...alter[path[0]][0], alter[path[0]][1]);
        }
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

    setDatas(){

        this._xdatas.body = this.childNodes;
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

        }

        this.replaceWith(...this._xtemplate);

    }

    buildStyle(styleRender){
        if(!this.class.selector){
            if(!!this.class.template){
                throw `You must use style() before render() in x-${this.class.xname} !`;
            }
            this.class.selector = scopedStyle(styleRender);
        }
    }

    // binders

    effect(dataName, action){
        this.proxy.effect(dataName, this, action, this._xdatas[dataName]);
    }

    bindElements(root, options){

        if(!root._xbinded){

            this.bindElement(root, options);

            if(!this.isXElement(root)){
                this.bindChilds(root, options);
            }

        }

    }

    bindChilds(root, options){

        if(this.isXElement(root)) { return; }

        for(let element of [].slice.call(root.children)){
            this.bindElements(element, options);
        }

    }

    bindElement(element, options){

        element.component = this;
        element._xbinded = true;

        if(this.isXAction(element)){
            this.bindAction(element, options);
        }
        else if(this.isXElement(element)){
            this.bindDatas(element, options);
        }
        else {
            this.bindAttributes(element, options);
        }

    }

    bindAction(element, options = {}){

        let name = element.tagName.substring(2);
        let path = this.getPath(element.getAttribute('var'), options.replace);
        let key = element.getAttribute('key');

        let xbegin = document.createComment(`x-${name}-begin`);
        let xend = document.createComment(`x-${name}-end`);

        let action;
        let content = element.innerHTML;
        let jar = document.createElement('div');
            jar.append(...element.childNodes);

        element.replaceWith(xbegin, xend);

        if(name === 'IF'){

            this.bindChilds(jar, options);

            action = ()=>{

                let value = this.access(path);
                let empty = xbegin.nextSibling === xend;
                let next;

                if(!!value && empty){
                    while(jar.childNodes.length){
                        xend.parentNode.insertBefore(jar.childNodes[0], xend);
                    }
                }
                else if(!value && !empty){
                    while((next = xbegin.nextSibling) !== xend){
                        jar.append(next);
                    }
                }

            }

        }

        else if(name === 'FOR'){

            let jarList = [];
            let count = 0;

            action = ()=>{

                let array = this.access(path);
                if(typeof array === 'undefined'){ return; }
                if(array._xiterable){ array = array.get; }

                let isNumber = typeof array === 'number';
                let length = isNumber ? array : array.length;
                let gap = length - count;

                if(gap > 0){

                    for(let x = count; (x < count + gap) && x < length; x++){

                        if(!jarList[x]){

                            if(key){
                                options.replace = options.replace || {};
                                options.replace[key] = [path, x];
                            }

                            let jar = xElement.parse(content);
                            this.bindChilds(jar, options);

                            let identifier = document.createComment(`x-${name}-item`);
                                identifier._xindex = x;
                                identifier._xjar = jar;
                                jar.prepend(identifier);

                            jarList.push(jar);

                        }

                        while(jarList[x].childNodes.length){
                            xend.parentNode.insertBefore(jarList[x].childNodes[0], xend);
                        }

                    }

                }
                else if(gap < 0){

                    for(let x = count - 1; (x > (count - 1) + gap) && x >= 0; x--){

                        let previous = xend.previousSibling;

                        while((!previous._xjar || previous._xjar !== jarList[x]) && previous !== xbegin){
                            previous = xend.previousSibling;
                            jarList[x].prepend(previous);
                        }

                    }

                }

                count += gap;

            }

        }

        else {
            return;
        }

        this.proxy.effect(path[0], element, action, this._xdatas[path[0]]);

    }

    bindDatas(element, options = {}){

        for(let attribute of element.attributes){

            if(this.isXAttribute(attribute)){

                let name = attribute.name.substring(2);
                let path = this.getPath(attribute.value, options.replace);

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

    bindAttributes(element, options = {}){

        for(let x=0, i=0; x<element.attributes.length; x++, i++){

            let attribute = element.attributes[x];
            let remove = true;

            if(this.isXAttribute(attribute)){

                let name = attribute.name.substring(2);
                let path = this.getPath(attribute.value, options.replace);

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

    // checks

    isXAction(element){
        return element.tagName === 'X-FOR' || element.tagName === 'X-IF';
    }

    isXElement(element){
        return element.tagName[0] === 'X' && element.tagName[1] === '-';
    }

    isXAttribute(attribute){
        return attribute.name[0] === 'x' && attribute.name[1] === '-';
    }

}

xElement.domParser = new DOMParser();

xElement.parse = (html)=>{
    return xElement.domParser.parseFromString(html, 'text/html').body;
}

customElements.define('x-element-prototype-factory', xElement);