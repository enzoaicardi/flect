

define('features', function(datas, render){

    datas['cases'] = [
        {
            title: '1 function',
            code: 'my code',
            props: [
                ['define', 'Define a web-component with a name, render function, and eventually a scoped style.'],
            ],
            index: 0,
        },
        {
            title: '3 params',
            code: 'other code',
            props: [
                ['datas', 'Access to your component related datas. Datas are one level deep only. Learn more in documentation.'],
                ['render', 'Render your HTML directly into your javascript. Enable the vscode es6-string-html extension to get syntax color.'],
                ['style', 'Define scoped style (or not) for your components.'],
            ],
            index: 1,
        },
        {
            title: '5 methods',
            code: 'other code',
            props: [
                ['this.ref', 'Return the first matching element with attribute ref=name.'],
                ['this.refs', 'Return an array of all matching elements with attribute ref=name.'],
                ['this.effect', 'Run a function when detecting a change on a dynamic data.'],
                ['this.flat', 'Distribute all the properties of an object into the dynamic datas of the component.'],
                ['this.custom', 'Just an object where you can store custom properties and functions.'],
            ],
            index: 2,
        },
        {
            title: '12 attributes',
            code: 'other code',
            props: [
                ['ref', 'Add element to component reference list.'],
                ['x-if', 'Display content if value is true.'],
                ['x-unless', 'Display content if value is false.'],
                ['x-for', 'Loop over an array and clone content for every item. Get the item through a variable.'],
                ['x-text', 'Display textContent'],
                ['x-html', 'Display innerHTML'],
                ['x-append', 'Append child elements'],
                ['x-prepend', 'Prepend child elements'],
                ['x-show', 'Add display none if your value is false'],
                ['x-toggle', 'Add class if your value is not falsy'],
                ['x-datas', 'Pass a dynamic object as data.'],
                ['datas', 'Pass a JSON object as data.'],
            ],
            index: 3,
        },
        {
            title: '4 properties',
            code: 'other code',
            props: [
                ['datas.body', 'Access to the body elements of the x-element.'],
                ['datas.text', 'Access to the textContent of the x-element.'],
                ['datas.html', 'Access to the innerHtml of the x-element.'],
                ['el.x', 'Access to the component from every child element.']
            ],
            index: 4,
        }
    ]

    this.flat('cases');
    datas['props'] = 0;
    datas['code'] = '';

    render(/*html*/`
        <div class="features">

            <div class="switch" x-for="cases" var="case">
                <button onclick="this.x.custom.switch(this)" ref="button" x-data-index="case.index" x-text="case.title">button</button>
            </div>

            <article class="case">

                <div class="sidebar" x-for="props" var="prop">
                    <div class="item">
                        <h3 x-text="prop.0"></h3>
                        <p x-text="prop.1"></p>
                    </div>
                </div>

                <code x-text="code"></code>

            </article>

        </div>
    `)

    this.custom.switch = (el)=>{

        let item = datas['cases'][Number(el.dataset.index)];
        this.flat('props', item.props);
        datas['code'] = item.code;

        this.refs('button').forEach(button => button.classList.remove('selected'));
        el.classList.add('selected');

    }

    this.custom.switch(this.ref('button'));

})