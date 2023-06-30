
```js
// proxy.js
// todo : voir garbage plus tard

garbage: {},

addGarbage(variable, key);

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
```

regler probleme de HTML + HEAD lors de l'import d'un composant.

utiliser node.getRootNode(options) pour le data-binding car permet de remonter a l'element source ?