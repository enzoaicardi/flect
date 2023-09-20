
import * as Flect from '../refactorv2/define.js';

Flect.define('input', class extends Flect.x {

    init(){
        this.datas.name = 'Fallback'

        setTimeout(() => {
            this.datas.name = 'Pierre Farget'
        }, 1000);

        this.filters = {
            split: value => value.split(' '),
            count: value => value.length
        }

        this.effects = {
            name: value => this.datas.count = value.length
        }
    
    }

    render(){
        return /*html*/`
            <div x-text="Fisrt name : {name|split.0} / Last name : {name|split.1}">not binded</div>
            <div x-text="count">not binded</div>
        `
    }

    // styles(x){
    //     return ``
    // }

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