
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
    datas['items'] = [
        [0,1,2]
    ]
    datas['bool'] = true;

    render(datas['body'])

    setTimeout(() => {
        datas['items'] = [
            [0,1,2],
            [3,1,2]
        ]
    }, 2000);
    setTimeout(() => {
        datas['items'] = [
            [0,1,2],
            [3,1,2],
            [0,1,2],
            [4,1,2],
            [3,1,2],
            [4,1,2],
            [8,1,2]
        ]
    }, 4000);
    setTimeout(() => {
        datas['bool'] = false;
    }, 6000);
})