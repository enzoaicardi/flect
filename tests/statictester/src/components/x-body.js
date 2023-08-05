import { testRegistry } from "../test.js";

define('body', function(datas, render, style){

    datas.registry = testRegistry;
    datas.entries = Object.entries(datas.registry);

    style(/*css*/$ => `
        
    `)

    render(/*html*/`
        <button class="stt-btn">Run all tests</button>
        <x-for var="entries" key="entry">
            <x-category ref="category" x-name="entry.0" x-tests="entry.1"></x-category>
        </x-for>
    `)

})