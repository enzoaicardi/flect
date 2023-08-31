import { xparse } from "../utils/parser.js";
import { proxyDatas } from "../proxy/datas.js";
import { createBindmap } from "../visitor/bindmap.js";
import { getValueFromPath, getValueFromPattern } from "../pattern/accesser.js";

export class XElement extends HTMLElement{

    constructor(){
        super()
    }

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

        // setup DOM bindind
        
    }

    filters = {}
    effects = {}

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
            this.proxy.effect(key, this, [this.effects[key]])
        }

    }

    setupStyle(){
        // TODO
    }

    setupRender(){

        let definition = this._xclass

        if(!definition.template){

            let dom = this.render()

            if(typeof dom === 'string'){
                definition.template = xparse(dom)
            }
            else{
                this.template = dom
            }

            definition.bindmap = createBindmap(definition.template)

        }

        this.template || (this.template = definition.template.cloneNode(true))

        !definition.bindmap || (this.bindElement(this.template, definition.bindmap))
        
        console.log(definition.bindmap)
        this.replaceWith(...this.template.childNodes)

    }

    // binding

    bindElement(element, bindmap){

        let maps = bindmap.children

        for(let index in maps){

            // todo remplacer les matchs ?
            // si key de datas = match alors remplace par value ?
            // non on accede a la valeur puis on accede à la nouvelle valeur en merge

            let node = element.children[index]
            let datas = maps[index].datas

            for(let key in datas){
                this.proxy.effect(key, node, ...datas[key])
            }

            this.bindElement(node, maps[index])

        }

    }

    bindAction(){
        // todo a voir que faire
    }

    // accessers

    getValue = getValueFromPattern

    getData = getValueFromPath

}