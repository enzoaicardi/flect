
define('div', function(datas, render, style){

    render(/*html*/`
        <p>Should render product name<b x-text="name"></b></p>
        <section x-text="product.name"></section>
    `)

});


define('section', function(datas, render, style){

    datas['item'] = {
        name: 'Panier',
        price: {
            tax: 5,
            total: 15
        }
    }

    console.log(datas['item'])
    this.flat('product', datas['item']);
    console.log(this._xdatas)

    render(/*html*/`
        <x-div datas-product='{"name":"Panio"}' name="name"></x-div>
    `)

});