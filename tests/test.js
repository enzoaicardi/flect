// Condition
// define('condition', function(datas, render){
//     datas['name'] = 'jac';
//     datas['correct'] = false;
//     datas['array'] = [1, 2, 3]

//     render(`
//     <label x-for="array">
//         <div x-if="correct">
//             <p x-text="name"></p>
//         </div>
//         <input ref="input" type="text" placeholder="Enter a name starting by the letter J">
//     </label>
//     `)
//     this.ref('input').addEventListener('keyup', e => {
//       if(this.ref('input').value && this.ref('input').value[0].toLowerCase() === 'j'){
//         datas['name'] = this.ref('input').value;
//         datas['correct'] = true;
//       }else{
//         datas['correct'] = false;
//       }
//     })

//     setTimeout(() => {
//         datas['array'] = []
//     }, 2500);
//     setTimeout(() => {
//         datas['array'] = [1, 2, 3, 4, 5]
//     }, 5000);
//     setTimeout(() => {
//         datas['array'] = [5, 4, 3, 2, 1, 4]
//     }, 7500);
// })

define('price-condition', function(datas, render){
  // datas['products'] = 10;

    render(`
      <table>
        <tr>
          <th>Product</th>
          <th>Price</th>
        </tr>
        <tbody x-for="products" var="item">
          <tr>
            <td x-text="products.length"></td>
            <td x-text="item.index"></td>
          </tr>
        </tbody>
      </table>
    `)

    // setTimeout(() => {
    //   datas['products'] = datas['products'].slice(1);
    // }, 1000);
  })

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