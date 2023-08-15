import { proxyDatas } from "../proxy/proxy-datas.js"
import { xparse } from "../utils/parser.js"
import { bindmapCreate } from "../visitor/bindmap.js"

export class XElement extends HTMLElement{

    constructor(){
        super()

        // _xdatas is empty object if not previously defined
        this._xdatas = this._xdatas || {}

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

    init(){
        // fallback
        // prevent errors if init is not defined on sub-class
    }

    setupDatas(){

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

    setupProxy(){
        this.proxy = proxyDatas()
        this.datas = new Proxy(this._xdatas, this.datas)
    }

    setupStyle(){
        // TODO
    }

    setupRender(){

        let node = xparse(this.render())
        console.log(bindmapCreate(node))

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

}