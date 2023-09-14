import { xparse } from "../utils/parser.js";
import { proxyDatas } from "../proxy/datas.js";
import { bindElement } from "../visitor/bind.js";
import { createBindmap } from "../visitor/bindmap.js";
import { getValueFromPath, getValueFromPattern } from "../pattern/accesser.js";

export class XElement extends HTMLElement{

    constructor(){
        super()
    }

    filters = {}
    effects = {}

    connectedCallback(){

        // _xdatas is empty object if not previously defined
        this._xdatas = this.datas || {}
        // if some datas are passed with x-attributes we add them to _xdatas
        !this._cdatas || (Object.assign(this._xdatas, this._cdatas))

        // setup datas from attribute
        this.setupDatas()

        // setup the data proxy
        this.setupProxy()

        // run init function from sub-class
        this.init(this.datas)

        // setup stylesheet
        this.setupStyle()

        // setup DOM render
        this.setupRender()
        
    }

    init(){
        // fallback
        // prevent errors if init is not defined on sub-class
    }

    // setup

    setupDatas(){

        let datas = this._xdatas
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
        this.datas = new Proxy(this._xdatas, this.proxy)

        for(let key in this.effects){
            this.proxy.effect(key, this, [[this.effects[key]]])
            this.effects[key](this._xdatas[key])
        }

    }

    setupStyle(){
        // TODO
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

    // binding

    bindMap = createBindmap

    bindElement = bindElement

    // accessers

    getValue = getValueFromPattern

    getData = getValueFromPath

}