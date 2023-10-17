/*

*/

import { XElement } from "./element-class.js";

export class xForElement extends XElement{

    init(){
        console.log("--> x-for element initialized", this._xcache)
    }

}