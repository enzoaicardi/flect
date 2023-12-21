import Flect from "../../bundle.js";

Flect.define("p", function (data, html) {
    this.name = data("enzo");
    this.background = data("");

    setTimeout(() => {
        this.name("gérard");
        this.background("red");
    }, 3000);

    return html`<p x-style="background() ? 'background: ' + background() : ''">
        Je m'appelle <span x-text="name() + ' ravi de vous voir'"></span>
    </p>`;
});
