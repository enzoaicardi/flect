
import * as Flect from '../refactorv2/define.js';

Flect.define('input', class extends Flect.x {

    init(datas){
        // console.log(datas)
    }

    render(){
        return `
            <div x-text="item" x-class="{item.type} {icon}">
                <x-for var="products" key="item">
                    <p x-text="item"></p>
                </x-for>
            </div>
        `
    }

})