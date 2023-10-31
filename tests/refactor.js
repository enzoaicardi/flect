
import * as Flect from '../refactorv3/index.js';

Flect.lazy({
    'x': ()=>import('./me.js')
})

Flect.define('test', class extends Flect.x {

    init(){

        this.datas.item = [1,1,1,1,1,1,1,1,1,1,1,1,1]

        setTimeout(()=>{
            this.datas.item.push(4)
            console.log('pushed')
        }, 1000)

        this.effects = {
            visibility: ()=>updateClass(),
            name: ()=>updateClass()
        }
    }

    render(){
        return /*html*/`
            <div x-class="{Class} {Class}">
                <p x-text="{item[]} bananas">Name should be here</p>
                <x-for>
                    <p x-test></p>
                </x-for>
            </div>
        `
    }

    updateClass(){
        return this.visibility + ' ' + this.name
    }

})

// Version fonction

/*

function xTest(){
    this.x.item = [1,1,1,1,1,1,1,1,1,1,1,1,1]
    console.log(this.x.item)
}

xTest.render = function(){
    return `<p x-class="Class">Text</p>`
}

xTest.updateClass = function(){
    // ...
}

Flect.define('test', xTest)

*/