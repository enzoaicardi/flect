

define('test', function(datas, render){

    datas['array'] = [1, 2, 3, 4];

    setTimeout(() => {
        datas['array'] = [9, 5, 6, 3];
    }, 1000);

    render(`<p x-text="array.1"></p>`)

})