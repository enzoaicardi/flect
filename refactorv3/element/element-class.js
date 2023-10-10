/*

*/

import { createProxyEffects } from "../proxy/proxy-effects.js"
import { createElementEffects } from "./element-effects.js"

export class XElement extends HTMLElement{

    constructor(){

        super()

        this._xdatas = this.datas
        this.datas = this.x = {}

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
        // ...

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