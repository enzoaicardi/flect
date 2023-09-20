import { xparse } from "../utils/parser.js";
import { proxyDatas } from "../proxy/datas.js";
import { bindElement } from "../visitor/bind.js";
import { createBindmap } from "../visitor/bindmap.js";
import { getValueFromPath, getValueFromPattern } from "../pattern/accesser.js";
import { createSelector, createStylerules } from "./style.js";

export class XElement extends HTMLElement{

    constructor(){
        super()

        // defaults values
        this.datas = {}
        this.filters = {}
        this.effects = {}
        this._xrefs = {}

        // binding
        this.bindMap = createBindmap
        this.bindElement = bindElement

        // accessers
        this.getValue = getValueFromPattern
        this.getData = getValueFromPath

    }

    connectedCallback(){

        // run init function from sub-class
        this.init(this.datas)

        // setup datas from non-x-attributes
        this.setupDatas()

        // setup _xdatas = datas and assign datas from x-attributes
        this._xdatas = this.xAttrDatas ? Object.assign(this.datas, this.xAttrDatas) : this.datas

        // setup the data proxy
        this.setupProxy()

        // setup stylesheet
        this.styles && (this._xclass.selector || (this.setupStyle()))

        // setup DOM render
        this.setupRender()
        
    }

    init(){
        // fallback -> prevent error if init is empty
        /*
            Define fallback datas via datas[...] = ...
            Define effects via this.effects = {...}
            Define filters via this.filters = {...}
        */
    }

    refs(name, callback){
        // add callback to reference
        // the callback will be executed when a ref is binded
        // TODO gérer le comportement de unbind disconnectedCallback avec les références
        let refs = this._xrefs
        refs[name] || (refs[name] = [])
        refs[name].push(callback)
    }

    // setup

    setupDatas(){

        let datas = this.datas
            datas.body = this.childNodes

        for(let attribute of this.attributes){

            // no need to check x-attributes because they are deleted on binding
            let name = attribute.name

            if(name.substring(0, 6) === 'datas-'){
                let object = JSON.parse(attribute.value)
                datas[name.substring(6)] = object
            }

            else{
                datas[name] = attribute.value
            }

        }

    }

    setupProxy(){

        this.proxy = proxyDatas(this)

        // transform datas into proxy of _xdatas
        this.datas = new Proxy(this._xdatas, this.proxy)

        for(let key in this.effects){
            this.proxy.effect(key, this, [[this.effects[key]]])
            this.effects[key](this._xdatas[key])
        }

    }

    setupStyle(){

        let definition = this._xclass
            definition.selector = createSelector()

        createStylerules(this.styles(definition.selector))

    }

    setupRender(){

        let definition = this._xclass
        let template

        if(!definition.template){

            let render = this.render()

            if(typeof render !== 'string') template = render
            else definition.template = xparse(render)

            definition.bindmap = this.bindMap(definition.template || render)

        }

        template || (template = definition.template.cloneNode(true))
        !definition.bindmap || (this.bindElement(template, definition.bindmap))
        
        // todo remove console
        console.log(definition.bindmap)

        this.replaceWith(...template.childNodes)

    }

}