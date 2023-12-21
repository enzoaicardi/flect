import Flect from "../../bundle.js";

Flect.define("p", function (data, html) {
    this.name = data("enzo");
    this.background = data("");

    this.handler = () => {
        console.log("handler triggered", this.name());
    };

    setTimeout(() => {
        this.name("edie");
        this.background("red");
    }, 3000);

    return html`<p x-on:click="handler">
        Je m'appelle
        <span x-text="name() + ', ravi de vous voir' + subname"></span>
    </p>`;
});
