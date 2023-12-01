let currentFunction = null;

function signal(value) {
    const dependencies = new Set();
    const getter = function (dataUpdated) {
        if (dataUpdated) {
            getter.data = dataUpdated;
            for (const fn of dependencies) {
                fn();
            }
        } else {
            currentFunction && dependencies.add(currentFunction);
            return getter.data;
        }
    };
    getter.data = value;
    return getter;
}

function reactive(fn) {
    currentFunction = fn;
    fn();
    currentFunction = null;
}

let test = signal({ name: "pierre" });

reactive(() => {
    console.log("parent function played once");
    reactive(() => console.log(`test value is ${test()} and double ${test()}`));
});

render(html`
    <div style=${() => `background: ${bgcolor()}`}>
        <p>Text test ${() => `text node here need analyze ?`}</p>
    </div>
`);
