
import * as Flect from '../refactorv2/define.js';

Flect.define('input', class extends Flect.x {

    init(datas){
        // console.log(datas)
    }

    render(){
        return `
            <div x-text="caca">
                <p></p>
                <p></p>
                <div>
                    <p>
                        <a><b><span></span></b></a>
                    </p>
                </div>
            </div>
        `
    }

})