import { xregex } from "../utils/regex.js";
import { proxyDatas } from "../proxy/datas.js";
import { xparse } from "../utils/parser.js";
import { createBindmap } from "../visitor/bindmap.js";

export class XElement extends HTMLElement{

    constructor(){
        super()

        // _xdatas is empty object if not previously defined
        this._xdatas || (this._xdatas = {})

        // setup datas from attribute
        this.setupDatas()

        // setup the data proxy
        // this.setupProxy()

        // run init function from sub-class
        this.init(this.datas)

        // setup stylesheet
        this.setupStyle()

        // setup DOM render
        this.setupRender()

    }

    filters = {}
    effects = {}

    init(){
        // fallback
        // prevent errors if init is not defined on sub-class
    }

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
        this.proxy = proxyDatas()
        this.datas = new Proxy(this._xdatas, this.datas)
    }

    setupStyle(){
        // TODO
    }

    setupRender(){

        let node = xparse(this.render())
        console.log(createBindmap(node))

        return;

        let definition = this._xclass

        if(definition.template){

        }
        else{

            let result = this.render()

            if(typeof result === 'string'){
                definition.template = xparse(result)
                result = definition.template.cloneNode(true)
            }
            else{

            }
        }
        // check if render exist
        // if exist render template

        // else, check render type
        // -> string convert to template + save + saveMAP
        // -> dom elements = use but don't save

        // if string ->
        // CreateMap + bindeffects visitor
        // Clone + clone binding to proxy
    }

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