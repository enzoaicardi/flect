
import * as Flect from '../refactorv3/index.js';

Flect.lazy({
    'x': ()=>import('./me.js')
})

Flect.define('test', class extends Flect.x {

    init(){

        this.datas.item = [1,2,3,4,5]
        
        setTimeout(()=>{
            this.datas.bg = 'red'
            this.datas.txt = 'yellow'
            // this.datas.item.shift()
            console.log('pushed')
        }, 1000)

        this.effects = {
            visibility: ()=>updateClass(),
            name: ()=>updateClass()
        }
    }

    render(){
        return /*html*/`
            <div x-style="background:{bg}; color:{txt};">
                <p x-text="{item.0} bananas">Name should be here</p>
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