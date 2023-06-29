export default function proxyFactory(){

    return {

        datas: {},

        attributes: {},

        addPair(property, variable, pair){
            if(!this[property][variable]){
                this[property][variable] = [];
            }
            this[property][variable].push(pair);
        },

        set(target, variable, value){

            target[variable] = value;

            console.log('change prop', variable, 'for', value);

            if(this.attributes[variable]){

                for(let pair of this.attributes[variable]){

                    if(pair[0] === 'text'){
                        pair[1].textContent = value;
                    }

                    else if(pair[0] === 'html'){
                        pair[1].innerHTML = value;
                    }

                    else{
                        pair[1].setAttribute(pair[0], value);
                    }

                }

            }

            if(this.datas[variable]){
                
                for(let pair of this.datas[variable]){
                    pair[1].setAttribute(pair[0], value);
                }

            }

            return true;
        }

    }

};
