
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
            <!--<div x-text="item" x-class="{icon|toArray.2|toSvg} {item.type}">-->
                <x-for var="products" key="item">
                    <x-for var="item.prices" key="price">
                        <p x-text="price.a"></p>
                        <p x-text="price.b"></p>
                    </x-for>
                    <x-for var="item.cacas" key="price">
                        <p x-text="price.c"></p>
                        <p x-text="price.d"></p>
                    </x-for>
                </x-for>
            <!--</div>-->
        `
    }

})
