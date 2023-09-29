
import * as Flect from '../refactorv2/define.js';

Flect.define('input', class extends Flect.x {

    init(){
        // this.datas.name = 'Fallback'
        this.datas.list = [0,1,1]
        this.datas.bool = true
        // this.datas.this = this

        setTimeout(() => {
            // this.datas.name = 'Pierre Farget'
            this.datas.list = [1,1,1]
            this.datas.bool = false
        }, 1000);
        setTimeout(() => {
            // this.datas.name = 'Pierre Farget'
            this.datas.list = [0,0]
        }, 2000);

        // setTimeout(() => {
        //     this.datas.list = [3,2,1,0,1,2,3]
        //     this.datas.name = 'Pierre Michel'
        // }, 2000);

        // setTimeout(() => {
        //     this.datas.list = [3,2]
        //     this.datas.name = 'Jean Michel'
        // }, 3000);^

        let index = 0

        this.filters = {
            split: value => value.split(' '),
            getIndex: value => index++,
            resetIndex: value => index = 0,
            // count: value => value ? value.length : 'no value'
        }

        this.effects = {
            // name: value => this.datas.count = value.length
        }
    
    }

    render(){
        return /*html*/`
        <x-if var="bool">
            <x-for var="list" key="item">
                <p><b>ARRAY --- </b><b x-text="item"></b></p>
                <p>Text conditionnal</p>
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
        <p x-text="{item} + 1 = {item|addOne} | index: {index}"></p>
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