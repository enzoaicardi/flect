
import * as Flect from '../refactorv2/define.js';

window.ctx = Flect.context()

Flect.define('input', class extends Flect.x {

    init(){
        // this.datas.name = 'Fallback'
        this.datas.list = [0,1,1]
        this.datas.bool = true

        this.filters = {
            split: value => value.split(' ')
        }
    
    }

    render(){
        return /*html*/`
        <x-if var="bool">
            <x-for var="list" key="item">
                <x-text x-item="item"></x-text>
            </x-for>
        </x-if>
        `
    }

})

Flect.define('text', class extends Flect.x{

    init(){
        this.filters = {
            split: value => value.split(' '),
            addOne: value => value+1,
            // count: value => value ? value.length : 'no value'
        }
    }

    render(){
        return /*html*/`
        <p x-text="{item} + 1 = {item|addOne} | index: {item}"></p>
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
        }, 500);
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
        return /*css*/`${x} {border: 1px solid red;}`
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

let globalContext = {

}