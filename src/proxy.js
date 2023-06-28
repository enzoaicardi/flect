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
                    pair[0].setAttribute(pair[1], value);
                }
            }

            if(this.datas[variable]){
                for(let pair of this.datas[variable]){
                    pair[0].setAttribute(pair[1], value);
                }
            }

            return true;
        }

    }

};
