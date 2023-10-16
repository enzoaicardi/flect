var Flect = (function (exports) {
    'use strict';

    /*

    */

    function createProxyEffects(xelements, key){

        return {
            
            key: key,

            contexts: xelements,

            // explore an object a create necessary proxys
            build: build,

            // push new context into proxy object
            populate: populate,
            
            // set a property, trigger effects and create necessary proxys
            set: setter,

        }

    }

    function build(object, key){

        // loop over all object properties
        for(let property in object){

            if(typeof object[property] === 'object'){

                // change property to proxy reference 
                object[property] = this.build(object[property], key + '.' + property);

            }

        }

        // create the proxy observer
        let proxy = createProxyEffects(this.contexts, key);

        // define _xproxy property on object
        Object.defineProperty(object, '_xproxy', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: proxy,
        });

        // create a new proxy
        return new Proxy(object, proxy)

    }

    function populate(xelement, target){

        // add a new context into current proxy
        this.contexts.push(xelement);

        // populate children
        for(let key in target){

            if(!!target[key]._xproxy){

                target[key]._xproxy.populate(xelement, target);

            }

        }

    }

    // every property set (works also for push, pop, etc...)
    function setter(object, property, value){

        // trigger update only if property value change
        if(object[property] !== value){

            // setup the proxy access key
            let key = this.key + '.' + property;

            // build if the new value is an object
            if(typeof value === 'object'){
                value = this.build(value, key);
            }

            // setup property value
            object[property] = value;

            let x = this.contexts.length - 1;
            
            // apply effects of all contexts or lazy remove
            while(x--){
                let effects = this.contexts[x]._xeffects;
                !effects ? (this.contexts.splice(x, 1)) : (effects.applyEffects(this.key, key, value));
            }

        }

        return true

    }

    /*

    map: {
        []: {}
        product: {}
        product[]: {}
        product.0: {}
        product.0[]: {}
        product.0.name: {}
    }

    */

    function createElementEffects(xelement){

        return {

            context: xelement,

            map: {},

            createEffect: createEffect,

            removeEffect: removeEffect,

            applyEffects: applyEffects

        }

    }

    function createEffect(key, node, action){
        !this.map[key] && (this.map[key] = new Map());
        this.map[key].set(node, action);
    }

    function removeEffect(key, node){
        this.map[key].delete(node);
    }

    function applyEffects(key, path, value){

        // global effects
        for(let property in this.map[key + '[]']){
            console.log('[effects] globals -> key:', key, '|value:', value);
        }

        // current effects
        for(let property in this.map[path]){
            console.log('[effects] current -> key:', key, '|value:', value);
        }

    }

    function isXElement(element){
        return element.tagName.indexOf('X-') === 0
    }

    function isXAttribute(name){
        return name.indexOf('x-') === 0
    }

    /*

    */

    let xregex = /\{(([a-z_]+[0-9a-z_]*|[0-9]+)(\[\])?(\.|\|)?)+([a-z_]+[0-9a-z_]*\|?)*\}/gi;

    /*

    */


    function createPath(text){

        // split filters
        let steps = text.split('|');

        // get negative status
        let negative = steps[0][0] === '!';

        return {
            key: !negative ? steps[0] : (steps[0].substring(1)),
            steps: steps,
            negative: negative,
            lastIndex: steps.length-1
        }

    }

    function createPattern(text, matches){

        let pattern = {
            paths: [],
            texts: [],
            isPattern: true
        };

        let index = 0;

        for(let match of matches){

            let x = index;
                index = text.indexOf(match, x);
            
            pattern.texts.push(text.substring(x, index));
            pattern.paths.push(createPath(match.substring(1, match.length-1)));

            index += match.length;

        }

        pattern.texts.push(text.substring(index));

        return pattern

    }

    // return <Path|Pattern>
    function getPath(text){

        // get path matches
        let matches = text.match(xregex);

        // if 0 {pattern} found
        if(!matches){
            return createPath(text)
        }

        // if 1 or more {pattern} found
        return createPattern(text, matches)

    }

    /*
        Only apply filters because value is sent by the proxy object throught effects
    */

    function getPathValue(value, path){

        if(path.lastIndex){
            // apply path filters (n+1)
            for(let x = 1; x < path.lastIndex; x++){
                value = path.steps[x](value);
            }
        }

        // return final value (with negative status)
        return path.negative ? !value : value

    }

    function getPatternValue(value, pattern, key){

        // setup the first value
        let text = pattern.text[0];

        // explore all path
        for(let x = 0; x < pattern.paths.length; x++){

            let path = pattern.paths[x];

            // update path value in memory
            if(path.key === key){
                path.value = getPathValue(value);
            }

            // update text value
            text += path.value || '';

        }

        // return value is allways <string>
        return text

    }

    function getAttributeAction(name, path){

        switch(name){
            // case 'x-ref': return updateRefAction
            case 'x-show': return updateDisplayAction
            case 'x-text': return path.isPattern ? updateTextPatternAction : updateTextAction
            case 'x-html': return path.isPattern ? updateHtmlPatternAction : updateHtmlAction
            default: return path.isPattern ? updateAttributePatternAction : updateAttributeAction
        }

    }

    // x-text
    function updateTextAction(value, path){
        this.textContent = getPathValue(value, path);
    }

    function updateTextPatternAction(value, pattern, key){
        this.textContent = getPatternValue(value, pattern, key);
    }

    // x-html
    function updateHtmlAction(value, path){
        this.innerHTML = getPathValue(value, path);
    }

    function updateHtmlPatternAction(value, pattern, key){
        this.innerHTML = getPatternValue(value, pattern, key);
    }

    // x-attr
    function updateAttributeAction(value, path){
        this.setAttribute(path.attribute, getPathValue(value, path));
    }

    function updateAttributePatternAction(value, pattern, key){
        this.setAttribute(pattern.attribute, getPatternValue(value, pattern, key));
    }

    // x-show
    function updateDisplayAction(value, path){

        let initial = this.style.display;
        let visible = getPathValue(value, path);

        if(!visible){
            this.style.display = 'none';
        }
        else {
            initial ? (this.style.display = initial) : (this.style.removeProperty('display'));
        }

    }

    // x-ref
    // TODO : a réimplémenter comme il faut

    function createBindingMap(nodeList){

        let list = [];

        for(let x = 0; x < nodeList.length; x++){

            let element = nodeList[x];
            let isComponent = isXElement(element);

            let map = {
                effects: [],
                once: [],
                list: false,
                index: false,
                template: false
            };

            let l = element.attributes.length-1;

            while(l--){
                
                // setup shortcuts
                let attribute = element.attributes[l];
                let value = attribute.value;
                let name = attribute.name;

                if(!isXAttribute(name)) continue

                // setup map.index
                map.index = x;

                if(isComponent);

                else {

                    // setup [path, action]
                    let path = getPath(value);
                    let action = getAttributeAction(name, path);

                    if(path.isPattern){

                        let uniques = {};

                        // create all effects related to unique paths
                        for(let p of path.paths){
                            if(uniques[p.key]) continue
                            createBindingMapEffect(map, path, action, p.key);
                        }

                    }

                    else {
                        // create effect for the only path
                        createBindingMapEffect(map, path, action);
                    }

                }

                // clear attribute
                element.removeAttribute(name);

            }

            // explore, prebind
            // add references
            // add _xcache {bindingMap, template} + add registry

            // setup map list (even for xElements)
            map.list = createBindingMap(element.children);

            // push map into the list
            map.index !== false || map.list && (list.push(map));


        }

        return list.length && list

    }

    function createBindingMapEffect(map, path, action, key){

        let effect = [path, action];
            effect.key = key || path.key;

        map.effects.push(effect);

    }

    document.createComment('');
    let xtemplate = document.createElement('template');
    let xfragment = document.createDocumentFragment();

    function createTemplate(html){

        // clone the template Element and inject innerHTML (for parsing)
        let template = xtemplate.cloneNode();
            template.innerHTML = html;

        // return the template DocumentfFragment
        return template.content

    }

    function asTemplate(node){

        let template = xfragment.cloneNode();
            template.append(...node.childNodes);

        return template

    }

    /*

    */


    class XElement extends HTMLElement{

        constructor(){

            super();

            // this._xcache = local bindingmap saved if there is a parent component
            // that have a template string litteral

            this._xdatas = this.datas;
            this.datas = this.x = {};
            this._xmatches = {};

            this._xproxy = createProxyEffects(this);
            this._xeffects = createElementEffects(this);

        }

        connectedCallback(){

            // run init function from sub-class
            this.init();

            // setup datas from non-x attributes
            // ...

            // setup _xdatas = datas and assign datas from x-attributes
            this._xdatas = this._xdatas ? Object.assign(this.datas, this._xdatas) : this.datas;

            // setup the datas proxy
            this.datas = this.x = this._xproxy.build(this._xdatas, 'datas');

            // setup stylesheet
            // ...

            // setup dom render
            this.setupRender();

            // this.parentNode.replaceChild(xfragment, this)

            console.log('xelement init -> ' + this.tagName);

        }

        setupAttributesDatas(){

        }

        setupScopedStylesheet(){

        }

        setupRender(){

            let definition = this._xcache || this._xclass;
            let template = definition.template;
            this._xcache || this._xclass.map;

            // if there is no template in cache or class statics
            // in this case there is also no bindingMap
            if(!template){

                // get result of render function
                let render = this.render();

                // if render is a string
                if(typeof render === 'string'){
                    template = definition.template = createTemplate(render);
                }
                // if render is xelement (this)
                else {
                    template = asTemplate(render);
                }

                // we finaly create and store the bindingMap
                definition.map = createBindingMap(template.children);

            }

            // if template is now in cache or class statics
            if(definition.template){
                template = template.cloneNode(true);
            }

            // bindElements(map, template)

            // replace xelement by his children
            this.parentNode.replaceChild(template, this);

        }

        // --- fallbacks

        init(){
            // fallback -> prevent error if init is empty
            /*
                Define fallback datas via this.datas... = ...
                Define effects via this.effects = {...}
                Define filters via this.filters = {...}
            */
        }

        disconnect(){
            // fallback -> prevent error if disconnect is empty
            /*
                Remove all persistent states when disconnected
                Example : clearInterval(my_persistent_interval)
            */
        }

    }

    /*

    */


    // export define as Flect.define
    function define(name, definition){

        // setup class statics
        definition.prototype._xclass = definition;

        // define native customElement
        customElements.define('x-' + name, definition);

    }

    exports.define = define;
    exports.x = XElement;

    return exports;

})({});
