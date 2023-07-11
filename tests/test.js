

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

    console.log(this.access(this.getPath('matchingProducts.1')))
    
    this.effect('maxPrice', value => {
        datas['matchingProducts'] = datas['products'].filter(product => product.price <= value);
    })
    
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