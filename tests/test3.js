
define('test-array', function(datas, render){

  datas['array'] = [1,2,3,5,6,7,8];

  this.filter('quantity', value => value > 8 ? 'a lot' : 'not that much')

  render(`
    <x-for var="array" key="item">
      <p x-text="Item value is {item} it's {item|quantity}"></p>
    </x-for>
  `)

  setTimeout(() => {
    datas['array'] = [3,4,5]
  }, 1000);
  setTimeout(() => {
    datas['array'] = [3,4,5,6]
  }, 3000);
  setTimeout(() => {
    datas['array'] = [90,800]
  }, 4000);
  setTimeout(() => {
    datas['array'] = [3,6,8,9,90,800]
  }, 5000);
})

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
    datas['days'] = daysInMonth(datas['year'], datas['month']+1);

    let proxy = new Proxy({}, {
      get(target, prop){
        iterable: datas['days']
        return Number(prop);
      }
    });

    render(/* html */`
    
        <section class="x-calendar">

            <header class="x-calendar-header">
                <button onclick="this.component.custom.previousMonth()">&lt;</button>
                <h2>
                    <span x-text="monthName"></span>
                    <span x-text="year"></span>
                </h2>
                <button onclick="this.component.custom.nextMonth()">&gt;</button>
            </header>

            <div class="x-calendar-grid" x-for="days" var="day">
                <x-day x-year="year" x-month="month"></x-day>
            </div>

        </section>

    `)

    this.effect('month', value => {
        datas['days'] = daysInMonth(datas['year'], value+1)
        datas['monthName'] = monthNames[value]
    });

    this.custom.nextMonth = function(){
        if(datas['month'] === 11) { datas['month'] = 0; datas['year']++; }
        else datas['month']++;
    }

    this.custom.previousMonth = function(){
        if(datas['month'] === 0) { datas['month'] = 11; datas['year']--; }
        else datas['month']--;
    }

});

define('day', function(datas, render){

  this.effect('index', value => datas['day'] = value+1)

  render(/*html*/`
      <div class="x-day" x-text="month">
          I'm a day
      </div>
  `);

})

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