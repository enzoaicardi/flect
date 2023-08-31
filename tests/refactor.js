
import * as Flect from '../refactorv2/define.js';

Flect.define('input', class extends Flect.x {

    init(datas){
        // console.log(this._xdatas)
    }

    datas = {
        name: 'Jeanne'
    }

    filters = {

        toNumber: (value)=>{
            Number(value)
        }

    }

    effects = {
        name: (value)=>this.datas.name = 6
    }

    render(){
        return /*html*/`
            <div x-text="item" x-class="{icon|toArray.2|toSvg} {item.type}">
                <!-- <x-for var="products" key="item">
                    <p x-text="item"></p>
                </x-for> -->
            </div>
        `
    }

})
