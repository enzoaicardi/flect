import { isXAction, isXAttribute, isXElement, xcomment } from "./assets.js"
import { getMatch, getPath } from "./path.js"
import { visit } from "./visitor.js"

// Element binding

export function bindElement(element){

    element.component = this
    element._xbinded = true

    if(isXAction(element)){
        this.bindAction(element)
    }

    else if(isXElement(element)){
        this.bindDatas(element)
    }

    else {
        // tell the visitor we want to explore deeper
        this.bindAttributes(element)
        return true
    }

}

// Action binding

export function bindAction(element){

    let action
    let name = element.tagName
    let path = getPath(element.getAttribute('var'))
    let key = element.getAttribute('key')
    let ctx = this
    
    let xstart = xcomment.cloneNode()
    let xend = xcomment.cloneNode()

    element.replaceWith(xstart, xend)

    if(name === 'X-IF'){

        visit(element, bindElement.bind(this))

        action = function(){

            let value = ctx.getData(path)
            let empty = xstart.nextSibling === xend
            let next;

            if(!!value && empty){
                while(this.childNodes.length){
                    before(xend, this.childNodes[0]);
                }
            }
            else if(!value && !empty){
                while((next = xstart.nextSibling) !== xend){
                    this.appendChild(next);
                }
            }

        }

    }

    else if(name === 'X-FOR'){

        let count = 0;
        let list = []

        action = function(){

            let value = ctx.getData(path)
            let length = typeof value === 'number' ? value : value.length;
            let gap = length - count;

            if(gap > 0){

                for(let x = count; (x < count + gap) && x < length; x++){
                    
                    if(!list[x]){

                        let jar = this.cloneNode()
                            ctx.copyNode(this, jar)
                            list.push(jar)

                        let index = xcomment.cloneNode()
                            index.xparent = jar
                            jar.prepend(index)

                    }

                    for(let node of [...list[x].childNodes]){
                        before(xend, node)
                    }

                }

            }

            else if(gap < 0){

                for(let x = count - 1; (x > (count - 1) + gap) && x >= 0; x--){

                    let previous = xend.previousSibling;

                    while(previous && previous.xparent !== list[x] && previous !== xstart){
                        previous = xend.previousSibling;
                        list[x].prepend(previous);
                    }

                }

            }

            count += gap

        }

    }

    this.proxy.effect(path[0], element, action);
    action.call(element)

}

function before(end, element){
    end.parentNode.insertBefore(element, end)
}

// Data binding (dynamic)

export function bindDatas(element){

    for(let attribute of element.attributes){

        let name = attribute.name
        let value = attribute.value

        if(isXAttribute(name)){

            name = name.substring(2)
            let match = getMatch(value)
            let ctx = this

            // Bind or create data
            if(!element._xdatas){ element._xdatas = {} }
                element._xdatas[name] = ctx.getValue(match)

            // Create action
            let action = function(){ this.datas[name] = ctx.getValue(match) }

            // Add effect
            for(let key in match.paths){
                this.proxy.effect(match.paths[key][0], element, action)
            }

        }

        else if(name === 'ref'){
            this.setRef(value, element)
        }

    }

}

// Attribute binding

export function bindAttributes(element){

    let attrs = element.attributes

    for(let x = 0; x < attrs.length; x++){

        // Setup variables
        let attribute = attrs[x]
        let name = attribute.name
        let value = attribute.value
        let match = getMatch(value)

        if(isXAttribute(name)){

            // Get action
            let action = this.getAttributeEffect(name, match)
            
            // Add effects
            for(let key in match.paths){
                this.proxy.effect(match.paths[key][0], element, action)
            }

            action.call(element)

        }

        else if(name === 'ref'){
            this.addRef(value, element)
        }

        else {
            continue
        }

        element.removeAttribute(name)
        x--
        
    }

}

export function getAttributeEffect(name, match){

    let ctx = this

    switch(name){

        case 'x-text':
            return function(){ this.textContent = ctx.getValue(match) }

        case 'x-html':
            return function(){ this.innerHTML = ctx.getValue(match) }

        case 'x-append':
        case 'x-prepend': 
            let method = name.substring(2)
            return function(){ 
                let item = ctx.getValue(match)
                if(item.length){ this[method](...item) }
                else { this[method](item) }
            }

        default:
            return function(){ this.setAttribute(name, ctx.getValue(match)) }

    }

}