

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


define('input', function(datas, render){

    console.log(datas['inputs'])
    console.log(JSON.parse(JSON.stringify(this._xdatas)))

    render(`
        <p x-text="inputs"></p>
        <div x-for="inputs" var="item">
            <input x-type="type" x-value="item.value">
        </div>
    `)

    console.log(JSON.parse(JSON.stringify(this._xdatas)))



})