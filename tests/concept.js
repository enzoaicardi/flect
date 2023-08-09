
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

    datas['text'] = 'kind of text';
    datas['items'] = [1,0,3]

    render(datas['body'])

    // setTimeout(() => {
    //     datas['text'] = 'other text'
    //     console.log(this.ref('child'))
    // }, 1000);

    setTimeout(() => {
        datas.text = 'not only text dude'
    }, 1000);

})

define('child', function(datas, render){

    datas.number = 10;
    this.iterable('number', 'array');
    this.filter('inc', value => Number(value) + 10)

    // this.effect('text', value => console.log(datas['text']));
    render(datas['body'])

    setTimeout(() => {
        datas.number = 5;
    }, 1000);
    
})