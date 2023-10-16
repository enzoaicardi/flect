
import * as Flect from '../refactorv3/index.js';

Flect.define('test', class extends Flect.x {

    init(){

        this.x.item = [1,1,1,1,1,1,1,1,1,1,1,1,1]

        // console.log(this.x.item)

        setTimeout(()=>{
            this.x.item.push(4)
            // console.log(this.x.item)
        }, 200)

        this.effects = {
            visibility: ()=>updateClass(),
            name: ()=>updateClass()
        }
    }

    render(){
        return /*html*/`
            <div x-class="{Class} {Class}">
                <x-div x-product>
                    
                </x-div>
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