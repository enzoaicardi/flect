import { xregex } from "../utils/regex.js";
import { proxyDatas } from "../proxy/datas.js";
import { xparse } from "../utils/parser.js";
import { createBindmap } from "../visitor/bindmap.js";

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
        this.datas = new Proxy(this._xdatas, this.datas)

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

        this.bindElement(this.template, definition.bindmap)

    }

    // binding

    bindElement(element, bindmap){

        for(let index in bindmap){

            let node = element.childNodes[index]
            let datas = bindmap[index].datas

            for(let key in datas){
                this.proxy.effect(key, element, ...datas[key])
            }

            this.bindElement(node, bindmap[index].bindmap)

        }

    }

    // accessers

    getValue(pattern){

        // if the base is equal to a data name
        if(pattern.datas[pattern.base]){
            return this.getData(pattern.datas[pattern.base])
        }

        // replace all groups by their match
        return pattern.base.replace(xregex, (group) => {
            return this.getData(pattern.datas[group])
        });

    }

    getData(path){

        let datas = this._xdatas

        // loop over steps but stop if value is falsy
        for(let x = 0; x < path.steps.length && !!datas; x++){
            datas = datas[path.steps[x]]
        }

        path.not || (datas = !datas)

        for(let x = 0; x < path.filters.length; x++){
            datas = this.filters[path.filters[x]]
        }

        return datas

    }

}