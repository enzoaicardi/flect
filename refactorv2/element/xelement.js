import { xparse } from "../utils/parser.js";
import { proxyDatas } from "../proxy/datas.js";
import { bindElements } from "../visitor/bind.js";
import { createBindmap } from "../visitor/bindmap.js";
import { unbindElements } from "../visitor/unbind.js";
import { createStylerules } from "./style.js";
import { getValueFromPath, getValueFromPattern } from "../pattern/accesser.js";

export class XElement extends HTMLElement{

    constructor(){
        super()

        // defaults values
        this._xdatas = this.datas
        this.datas = {}
        this.filters = {}
        this.effects = {}
        this._xrefs = {}

        // binding
        this.createBindmap = createBindmap
        this.unbindElements = unbindElements
        this.bindElements = bindElements

        // accessers
        this.getValue = getValueFromPattern
        this.getData = getValueFromPath

    }

    connectedCallback(){

        // run init function from sub-class
        this.init()

        // setup datas from non-x-attributes
        this.setupDatas()

        // setup _xdatas = datas and assign datas from x-attributes
        this._xdatas = this._xdatas ? Object.assign(this.datas, this._xdatas) : this.datas

        // setup the data proxy
        this.setupProxy()

        // setup stylesheet
        this.styles && (this._xclass.selector || (this.setupStyle()))

        // setup DOM render
        this.setupRender()
        
    }

    /* disconnectedCallback(){
        // we don't use it because the element is imediately disconnected
        // after being initiated 
    } */

    disconnectXElement(){

        // run disconnect function from sub-class
        this.disconnect()

        // delete all instance properties
        delete this.datas
        delete this.proxy
        delete this._xdatas
        delete this._xrefs
        delete this.filters
        delete this.effects

    }

    init(){
        // fallback -> prevent error if init is empty
        /*
            Define fallback datas via datas[...] = ...
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

    refs(name, callback){
        
        // add callback to callstack
        let refs = this._xrefs
        refs[name] || (refs[name] = [])
        refs[name].push(callback)

        // apply changes to references
        this.datas[name] = callback

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
            definition.selector = createStylerules(this.styles)

    }

    setupRender(){

        let definition = this._xclass
        let template

        // create definition template if it's empty
        if(!definition.template){

            let render = this.render()

            if(typeof render !== 'string') template = render
            else definition.template = xparse(render)

            // create and store bindmap (overwrite if render not <string>)
            definition.bindmap = this.createBindmap(definition.template || render)

        }

        // get template from clone
        template || (template = definition.template.cloneNode(true))

        // bind elements if needed
        !definition.bindmap || (this.bindElements(template, definition.bindmap))
        
        // dev => check the global bindmap
        // console.log(definition.bindmap)

        // replace main customelement tag by it's childNodes
        this.replaceWith(template)

    }

}