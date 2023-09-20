
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
        <x-div x-name="name"></x-div>
        `
    }

})

Flect.define('div', class extends Flect.x{
    render(){
        return /*html*/`
        <div x-scoped>
            <div x-ref="button" x-text="My name is {name}">not binded</div>
        </div>
        `
    }

    styles(x){
        return `${x} {border: 1px solid red;}`
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