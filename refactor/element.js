import { xparse, xregex } from "./assets.js";
import { bindAction, bindAttributes, bindDatas, bindElement, getAttributeEffect } from "./bind.js";
import { getData, getFilter, getValue } from "./path.js";
import { proxyDatas } from "./proxy.js";
import { visit, copyNode } from "./visitor.js";

export class FlectXElement extends HTMLElement{

    constructor(){

        super()
        this._xrefs = {}
        this._xdatas = this._xdatas || {}
        this._xfilters = {}

        this.init()

    }

    // #private

    init(){
        this.initProxy()
        this.initDatas()
        this.xclass.xrender.call(this, this.datas, this.initTemplate.bind(this))
    }
    
    initProxy(){
        this.proxy = proxyDatas();
        this.datas = new Proxy(this._xdatas, this.proxy);
    }

    initDatas(){

        let datas = this._xdatas;
            datas.body = this.childNodes;

        for(let attribute of this.attributes){

            let name = attribute.name

            if(name.substring(0, 6) === 'datas-'){
                let object = JSON.parse(attribute.value);
                datas[name.substring(6)] = object;
            }

            else{
                datas[name] = attribute.value;
            }

        }

    }

    initTemplate(element){

        let definition = this.xclass

        if(typeof element === 'string'){

            if(!definition.template){
                definition.template = xparse(element)
            }

            element = definition.template.cloneNode(true)

        }

        // visit and bind all children
        visit(element, bindElement.bind(this))

        // replace wc by its childNodes
        this.replaceWith(...element.childNodes)

    }

    addRef(name, element){

        let refs = this._xrefs

        if(!refs[name]){
            refs[name] = []
        }
        refs[name].push(element)

    }

    bindElement = bindElement

    bindAction = bindAction

    bindDatas = bindDatas

    bindAttributes = bindAttributes

    getAttributeEffect = getAttributeEffect

    getData = getData
    
    getValue = getValue
        
    getFilter = getFilter

    copyNode = copyNode

    // public methods

    ref(){

    }

    refs(){

    }

    effect(){

    }

    filter(){

    }

}