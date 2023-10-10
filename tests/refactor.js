
import * as Flect from '../refactorv3/index.js';

Flect.define('test', class extends Flect.x {

    init(){

        this.x.item = {
            name: 'haha',
            price: {
                tax: 10,
                brut: 20
            }
        }

        console.log(this.x.item)

        setTimeout(()=>{
            this.x.item.price.tax = {}
        }, 200)

    }

    render(){
        return /*html*/`
            <p>Text</p>
        `
    }

})
