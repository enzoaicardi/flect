export default function proxyFactory(){

    return {

        datas: {},

        /*{ *Object
            data: [[ *Map
                element: [attr, attr, attr]
            ]]
        }*/
        attributes: {},

        addBind(property, variable, key, value){

            // get property
            let obj = this[property];

            // setup the default variable key
            if(!obj[variable]){
                obj[variable] = new Map();
            }

            // setup the default key value
            if(!obj[variable].get(key)){
                obj[variable].set(key, []);
            }

            // push the current binded value
            obj[variable].get(key).push(value);

        },

        effects: {},

        addEffect(variable, transformer){
            if(!this.effects[variable]){
                this.effects[variable] = [];
            }
            this.effects[variable].push(transformer);
        },

        set(target, variable, value){

            // update the value first
            target[variable] = value;
            // console.log('change prop', variable, 'for', value);

            // explore attribute binding
            if(this.attributes[variable]){

                // for each data loop over attached elements
                for(let [element, attributes] of this.attributes[variable]){

                    // for each element loop over attached attributes
                    for(let attribute of attributes){

                        // special binding
                        if(attribute === 'text'){
                            element.textContent = value;
                        }
    
                        else if(attribute === 'html'){
                            element.innerHTML = value;
                        }

                        else if(attribute === 'show'){
                            if(!value){ element.style.display = 'none'; }
                            else{ element.style.removeProperty('display'); }
                        }

                        else if(attribute === 'if'){

                            if(!element._xchilds){
                                element._xchilds = [].slice.call(element.childNodes);
                            }

                            let hasChild = element.childNodes.length;

                            if(!!value && !hasChild){
                                element.append(...element._xchilds);
                            }
                            if(!value && hasChild){
                                for(let node of element._xchilds){
                                    element.removeChild(node);
                                }
                                console.log(element);
                            }

                        }

                        else if(attribute === 'for'){

                        }
    
                        // regular binding
                        else{
                            element.setAttribute(attribute, value);
                        }

                    }

                }

            }

            if(this.datas[variable]){
                for(let [element, properties] of this.datas[variable]){
                    for(let property of properties){
                        element.datas[property] = value;
                    }
                }
            }

            if(this.effects[variable]){
                for(let transformer of this.effects[variable]){
                    transformer(value);
                }
            }

            return true;
        }

    }

};
