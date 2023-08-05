

define('test', function(datas, render){

    render(/*html*/`
        <p x-text="name"></p>
        <button>Run test</button>
        <div ref="view" class="statictest-view">Vue</div>
    `)

    datas['view'] = this.ref('view');

})