export default function proxyFactory(){

    return {

        datas: {},

        attributes: { // Obj
            /*
                count: {
                    el: [attr, attr, attr]
                }
            */
        },

        garbage: {
            // el: [count] -> delete
        },

        addState(property, variable, key, value){

            let obj = this[property];

            if(!obj[variable]){
                obj[variable] = {};
            }

            if(!obj[variable][key]){
                obj[variable][key] = [];
            }

            obj[variable][key].push(value);

            addGarbage(variable, key);

        },

        addGarbage(variable, key){

            let obj = this.garbage;

            if(!obj[key]){
                obj[key] = [];
            }
            obj[key].push(variable);

        },

        clear(key){

            let obj = this.garbage;

            if(obj[key]){
                for(let value of obj[key]){
                    if(this.datas[value]){ delete this.datas[value][key]; }
                    if(this.attributes[value]){ delete this.attributes[value][key]; }
                }
                delete obj[key];
            }

        },

        set(target, variable, value){

            target[variable] = value;

            console.log('change prop', variable, 'for', value);

            if(this.attributes[variable]){

                for(let pair of this.attributes[variable]){

                    if(pair[1] === 'text'){
                        pair[0].textContent = value;
                    }

                    else if(pair[1] === 'html'){
                        pair[0].innerHTML = value;
                    }

                    else{
                        pair[0].setAttribute(pair[1], value);
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
