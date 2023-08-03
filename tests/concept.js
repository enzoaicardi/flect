
class Child extends HTMLElement{
    constructor(){
        super();
        console.log('child load', [].slice.call(this.children))
        this.replaceWith(...this.children);
    }
}

class Parent extends HTMLElement{
    constructor(){
        super();
        console.log('parent load', [].slice.call(this.children))
    }
}



define('parent', function(datas, render, style){

    datas['items'] = 6;
    this.iterable('items', 'iterable');
    
    datas['bool'] = true;

    console.log(this.textContent)
    render(datas['body'])


    setTimeout(() => {
        datas['bool'] = false;
    }, 2000);
    setTimeout(() => {
        datas['bool'] = true;
    }, 4000);

})

// define('kid', function(datas, render){
//     render(datas['body'])
//     console.log(datas['text']);
// })