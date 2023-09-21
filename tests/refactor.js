
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

    init(){
        
    }

    render(){
        return /*html*/`
        <x-for var="products" key="item">
        <div x-scoped x-on:click="red" x-on:mouseenter="green">
            <div x-ref="button" x-style="item">My name is <b x-text="name"></b></div>
        </div>
        </x-for>
        `
    }

    red(event){
        event.currentTarget.style.background = 'red'
    }
    green(event){
        event.currentTarget.style.background = 'green'
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