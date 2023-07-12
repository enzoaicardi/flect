

define('test', function(datas, render){

    setTimeout(() => {
        datas['array'] = [1, 2, 3];
    }, 1000);

    render(`
        <div x-for="array" var="item">
            <p x-text="item"></p>
        </div>
    `)

})


define('price-condition', function(datas, render){
  
    datas['matchingProducts'] = datas['products']
    datas['maxPrice'] = 40

    // console.log(this.access(this.getPath('matchingProducts.1')))
    
    // this.effect('maxPrice', value => {
    //     datas['matchingProducts'] = datas['products'].filter(product => product.price <= value);
    // })
    
    render(`
      <input ref="input" type="number" placeholder="Enter a maximum price">
      <table>
        <tr>
          <th>Product</th>
          <th>Price</th>
        </tr>
        <tbody x-for="matchingProducts" var="item">
          <tr>
            <td x-text="item.name"></td>
            <td x-text="item.price"></td>
          </tr>
        </tbody>
      </table>
    `)
    
    this.ref('input').addEventListener('keyup', e => {
      datas['maxPrice'] = Number(this.ref('input').value)
    });
});

define('iterable', function(datas, render){

  // datas['item'] = 4;
  // datas['item'] = 10;
  datas['item'] = 'abcdef';
  // datas['item'] = {product: 'me', user: 'andrew'}

  this.iterable('item', 'iterable');

  setTimeout(() => {
    datas['item'] = Object.entries({product: 'me', user: 'andrew'});
  }, 1000);

  setTimeout(() => {
    datas['item'] = Object.entries({product: 'me', user: 'andrew', name: 'nick'});
  }, 2000);

  setTimeout(() => {
    datas['item'] = [3,7,9,0,5,8,7];
  }, 3000);

  render(`
    <div x-for="iterable" var="item">
      <p>
        Key : <span x-text="item.key">ITEM</span> |
        Value : <span x-text="item.value">ITEM</span> |
        Parent : <span x-text="item.parent">ITEM</span>
      </p>
    </div>
  `)

})