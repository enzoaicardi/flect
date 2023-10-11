
import * as Flect from '../refactorv3/index.js';

Flect.define('test', class extends Flect.x {

    init(){

        this.x.item = [[1,1,1,1,1,1,1,1,1,1,1,1,1]]

        console.log(this.x.item)

        setTimeout(()=>{
            this.x.item[0].unshift(3)
        }, 200)

    }

    render(){
        return /*html*/`
            <p>Text</p>
        `
    }

})
