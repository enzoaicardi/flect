const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

function daysInMonth(year, month){
    return new Date(year, month, 0).getDate();
}

define('calendar', function(datas, render){

    let date = new Date();
    datas['year'] = date.getFullYear();
    datas['month'] = date.getMonth();
    datas['monthName'] = monthNames[datas['month']];
    datas['days'] = daysInMonth(datas['year'], datas['month']);

    render(/* html */`
    
        <section class="x-calendar">

            <header class="x-calendar-header">
                <button onclick="this.component.custom.nextMonth()">&lt;</button>
                <h2>
                    <span x-text="monthName"></span>
                    <span x-text="year"></span>
                </h2>
                <button onclick="this.component.custom.nextMonth()">&gt;</button>
            </header>

            <div class="x-calendar-grid" x-for="days" var="day">
                <x-day x-year="year" x-month="month" x-day="day.index"></x-day>
            </div>

        </section>

    `)

    this.effect('month', value => {
        datas['days'] = daysInMonth(datas['year'], datas['month'])
        datas['monthName'] = monthNames[value]
    });

    this.custom.nextMonth = function(){
        if(datas['month'] === 11) datas['month'] = 0;
        else datas['month']++;
    }

});


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
    datas['products'] = 4;

    render(`
      <table>
        <tr>
          <th>Product</th>
          <th>Price</th>
        </tr>
        <tbody x-for="products" var="item">
          <tr>
            <td x-text="products.length"></td>
            <td><x-index x-index="item.index" x-length="products"></x-index></td>
          </tr>
        </tbody>
      </table>
    `)

    // setTimeout(() => {
    //   datas['products'] = 6;
    //   document.body.insertAdjacentHTML('beforeend', `<x-price-condition timeout="3000"></x-price-condition>`)
    // }, Number(datas['timeout']));

    // setTimeout(() => {
    //   datas['products'] = 2;
    // }, Number(datas['timeout']) + 1000);

  })

define('index', function(datas, render){
  render(`<p><span x-text="length">LENGTH</span>/<span x-text="index">INDEX</span></p>`)
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