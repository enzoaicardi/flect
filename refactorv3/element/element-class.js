/*

*/

import { createProxyEffects } from "../proxy/proxy-effects.js"
import { createElementEffects } from "./element-effects.js"
import { createBindingMap } from "../binding/binding-map.js"
import { asTemplate, createTemplate } from "../utils/utils-templates.js"

export class XElement extends HTMLElement{

    constructor(){

        super()

        // this._xcache = local bindingmap saved if there is a parent component
        // that have a template string litteral

        this._xdatas = this.datas
        this.datas = this.x = {}
        this._xmatches = {}

        this._xproxy = createProxyEffects(this)
        this._xeffects = createElementEffects(this)

    }

    connectedCallback(){

        // run init function from sub-class
        this.init()

        // setup datas from non-x attributes
        // ...

        // setup _xdatas = datas and assign datas from x-attributes
        this._xdatas = this._xdatas ? Object.assign(this.datas, this._xdatas) : this.datas

        // setup the datas proxy
        this.datas = this.x = this._xproxy.build(this._xdatas, 'datas')

        // setup stylesheet
        // ...

        // setup dom render
        this.setupRender()

        // this.parentNode.replaceChild(xfragment, this)

        console.log('xelement init -> ' + this.tagName)

    }

    setupAttributesDatas(){

    }

    setupScopedStylesheet(){

    }

    setupRender(){

        let definition = this._xcache || this._xclass
        let template = definition.template
        let map = this._xcache || this._xclass.map

        // if there is no template in cache or class statics
        // in this case there is also no bindingMap
        if(!template){

            // get result of render function
            let render = this.render()

            // if render is a string
            if(typeof render === 'string'){
                template = definition.template = createTemplate(render)
            }
            // if render is xelement (this)
            else{
                template = asTemplate(render)
            }

            // we finaly create and store the bindingMap
            map = definition.map = createBindingMap(template.children)

        }

        // if template is now in cache or class statics
        if(definition.template){
            template = template.cloneNode(true)
        }

        // bindElements(map, template)

        // replace xelement by his children
        this.parentNode.replaceChild(template, this)

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