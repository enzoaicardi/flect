
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

    setTimeout(() => {
        datas['text'] = 'other text'
        console.log(this.ref('child'))
    }, 1000);

})

define('child', function(datas, render){

    this.effect('text', value => console.log(this.component.datas['text']));
    render(datas['body'])
    
})