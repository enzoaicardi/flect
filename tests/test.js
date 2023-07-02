
console.log(define);
define('div', function(datas, render){

    render(/*html*/`
        <section x-append="body">
            <h2>Ceci est une balise h2 <span x-text="product.name"></span></h2>
        </section>
    `)

    this.flat('product', {name: 'fruit'});


}, ($)=>{
    return /* css */`
        ${$} > *{
            background-color: red;
        }
        @media screen and (max-width: 300px){
            ${$} > *{
                background-color: green;
            }
        }
    `;
});