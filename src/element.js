import { proxyDatas, proxyIterable } from './proxy.js';
import { scopedStyle } from './style.js';
let xregex = /\{[a-zA-Z0-9_.$!?|-]+\}/g;

export default class xElement extends HTMLElement{

    constructor(){
        super();
        this._xrefs = {};
        this._xdatas = this._xdatas || {};
        this._xfilters = {};
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
        if(this._xrefs[name]){
            return this._xrefs[name][0];
        }
    }

    refs(name){
        return this._xrefs[name];
    }

    getPath(str, alter){

        let sections = str.split('|');
        let path = sections[0].split('.');

        if(path[0][0] === '!'){
            path._xnot = '!';
            path[0] = path[0].substring(1);
        }

        if(alter && alter[path[0]]){
            path.splice(0, 1, ...alter[path[0]][0], alter[path[0]][1]);
        }

        path._xfilters = sections;

        return path;

    }

    getPaths(value, alter){

        let paths = {};
        let matchs = value.match(xregex);

        if(!matchs){
            paths.default = this.getPath(value, alter);
        }
        else {
            for(let match of matchs){
                if(!paths[match]){
                    paths[match] = this.getPath(match.substring(1, match.length-1), alter);
                }
            }
        }

        return paths;

    }

    getData(path){

        let datas = this._xdatas;

        for(let step of path){

            datas = datas[step];
            if(typeof datas === 'undefined'){ break; }
            
        }

        let result = path._xnot ? !datas : datas;

        for(let x=1; x<path._xfilters.length; x++){

            let filter = this._xfilters[path._xfilters[x]];
            result = filter ? filter(result) : result;

        }

        return result;
        
    }

    getValue(paths, value){

        if(paths.default){
            return this.getData(paths.default);
        }

        return value.replace(xregex, (match) => {
            return this.getData(paths[match]);
        });

    }

    // setters

    setDatas(){

        let datas = this._xdatas;
        datas.body = this.childNodes;

        for(let attribute of this.attributes){

            if(!this.isXAttribute(attribute)){

                if(attribute.name.substring(0, 6) === 'datas-'){

                    let name = attribute.name.substring(6);
                    let object = JSON.parse(attribute.value);
                    datas[name] = object;

                }

                else{
                    datas[attribute.name] = attribute.value;
                }

            }

        }

    }

    setProxy(){
        this.proxy = proxyDatas();
        this.datas = new Proxy(this._xdatas, this.proxy);
    }

    setRef(name, element){

        let refs = this._xrefs;

        if(!refs[name]){
            refs[name] = [];
        }
        refs[name].push(element);

    }

    joinPath(path){
        return (path._xnot || '') + path.join('.');
    }

    effect(dataName, action){
        this.proxy.effect(dataName, this, action);
        action(this._xdatas[dataName], this);
    }

    filter(name, action){
        this._xfilters[name] = action;
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

        if(!!html){

            let definition = this.class;

            if(typeof html === 'string'){

                if(!definition.template){
                    definition.template = xElement.parse(html);
                }

                this._xtemplate = definition.template.cloneNode(true).childNodes;

            }

            else{
                this._xtemplate = definition.template = html;
            }

            for(let node of this._xtemplate){

                if(node.nodeType === 1) {
                    if(definition.selector){
                        node.setAttribute('style-ref', definition.selector);
                    }
                    this.bindElements(node);
                }

            }

            this.replaceWith(...this._xtemplate);

        }

    }

    buildStyle(styleRender){

        let definition = this.class;

        if(!definition.selector){
            if(!!definition.template){
                throw `You must use style() before render() in x-${definition.xname} !`;
            }
            definition.selector = scopedStyle(styleRender);
        }

    }

    // binders

    bindElements(root, options){

        if(!root._xbinded){

            this.bindElement(root, options);

            if(!this.isXElement(root)){
                this.bindChilds(root, options);
            }

        }

    }

    bindChilds(root, options){

        if(!this.isXElement(root)){

            for(let element of [].slice.call(root.children)){
                this.bindElements(element, options);
            }

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

    // bindings

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

                let value = this.getData(path);
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

                let array = this.getData(path);
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

        this.proxy.effect(path[0], element, action);
        action();

    }

    bindDatas(element, options = {}){

        for(let attribute of element.attributes){

            if(this.isXAttribute(attribute)){

                let name = attribute.name.substring(2);
                let value = attribute.value;
                let paths = this.getPaths(value, options.replace);

                let action = ()=>{ element.datas[name] = this.getValue(paths, value); }

                if(!element._xdatas){
                    element.datas = element._xdatas = {};
                }

                element._xdatas[name] = this.getValue(paths, value);

                for(let key in paths){
                    this.proxy.effect(paths[key][0], element, action);
                }

            }

            else if(attribute.name === 'ref'){
                this.setRef(attribute.value, element);
            }

        }

    }

    bindAttributes(element, options = {}){

        for(let x=0; x<element.attributes.length; x++){

            let attribute = element.attributes[x];
            let remove = true;

            if(this.isXAttribute(attribute)){

                let name = attribute.name.substring(2);
                let value = attribute.value;
                let paths = this.getPaths(value, options.replace);

                let action = ()=>{ element.setAttribute(name, this.getValue(paths, value)); };

                if(name === 'text'){
                    action = ()=>{ element.textContent = this.getValue(paths, value); };
                }
    
                else if(name === 'html'){
                    action = ()=>{ element.innerHTML = this.getValue(paths, value); };
                }

                else if(name === 'append' || name === 'prepend'){
                    action = ()=>{
                        let value = this.getData(paths.default);
                        if(!!value){
                            if(value.length){ element[name](...value); }
                            else{ element[name](value); }
                        }
                    };
                }
    
                else if(name === 'show'){
                    action = ()=>{
                        if(!this.getData(paths.default)){ element.style.display = 'none'; }
                        else{ element.style.removeProperty('display'); }
                    };
                }
                
                for(let key in paths){
                    this.proxy.effect(paths[key][0], element, action);
                }

                action();

            }

            else if(attribute.name === 'ref'){
                this.setRef(attribute.value, element);
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