/*

*/

import { XElement } from "../element/element-class.js";

export class xForElement extends XElement{

    init(){
        console.log("--> x-for element initialized", this._xcache)
    }

}