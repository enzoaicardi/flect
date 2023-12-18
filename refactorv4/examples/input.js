Flect.define("input", function (data, html) {
    this.value = data("some text here");

    html`<div>
        <p>My input component</p>
        <input x-type="type || 'text'" x-value="value()" />
    </div>`;
});
