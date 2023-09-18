
import * as Flect from '../refactorv2/define.js';

Flect.define('input', class extends Flect.x {

    init(datas){
        // console.log(this._xdatas)

        setTimeout(() => {
            this.datas.name = 'Pierre Farget'
        }, 1000);
    
    }

    render(){
        return /*html*/`
        <x-for var="products">
            <div x-text="name|split.0">not binded</div>
            <div x-text="count">not binded</div>
        </x-for>
        `
    }

    style(x){
        return ``
    }

})

/*

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

*/