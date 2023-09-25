
import * as Flect from '../refactorv2/define.js';

Flect.define('input', class extends Flect.x {

    init(){
        this.datas.name = 'Fallback'
        this.datas.list = [3,2,1]

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
        <x-for var="list" key="listItem">
            <p x-text="listItem"></p>
        </x-for>
        `
    }

})

Flect.define('div', class extends Flect.x{

    init(){
        this.refs('button', el => el.style.padding = '10px')
        this.refs('button', el => el.style.background = 'lime')
        this.refs('button', el => el.style.border = '10px solid yellow')
        setTimeout(() => {
            this.refs('button', el => el.style.padding = '20px')
        }, 1000);
    }

    render(){
        return /*html*/`
        <div x-scoped>
            <div x-ref="button" x-on:click="red" x-on:mouseenter="green">My name is <b x-text="name"></b></div>
            <div x-ref="button" x-on:click="green" x-on:mouseenter="red">My name is <b x-text="name"></b></div>
        </div>
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