
define('category', function(datas, render){

    datas.entries = Object.entries(datas.tests);

    render(/*html*/`
        <p x-text="name"></p>
        <button>Run all tests</button>
        <x-for var="entries" key="entry">
            <x-test ref="test" x-name="entry.0" x-callback="entry.1"></x-test>
        </x-for>
    `)

})