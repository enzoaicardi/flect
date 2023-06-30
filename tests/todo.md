
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