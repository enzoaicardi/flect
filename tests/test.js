
define('negative', function(datas, render){

  datas['products'] = [true, false, true];

  setTimeout(() => {
    datas['products'] = [false, true, true];
  }, 2000);

  render(`
    <section x-for="products" var="item">
      <div x-show="item">Vous avez des produits</div>
      <article x-show="!item">Vous n'avez pas de produits</article>
    </section>
  `)

})

define('counter', function(datas, render){
  datas['count'] = 0;
  render(`
    <button ref="button">
      <p>Count is : <b x-text="count"></b></p>
    </button>
  `)
  this.ref('button').addEventListener('click', e => datas['count']++);
});

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
    
    this.effect('maxPrice', value => {
        datas['matchingProducts'] = datas['products'].filter(product => product.price <= value);
    })
    
    render(datas['body'])
    
    this.ref('input').addEventListener('keyup', e => {
      datas['maxPrice'] = Number(this.ref('input').value)
    });
});

define('product', function(datas, render){
  render(`<p>
  <span x-text="item.name"></span>
  <span x-text="item.price"></span>
</p>`)
})

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
      <x-item x-item="item"></x-item>
    </div>
  `)

})

define('item', function(datas, render){

  render(`
    <p>
      Key : <span x-text="item.key">ITEM</span> |
      Value : <span x-text="item.value">ITEM</span> |
      Parent : <span x-text="item.parent">ITEM</span>
    </p>
  `)

})