import Flect from "../../bundle.js";

Flect.define("p", function (data, html) {
    this.name = data("enzo");
    this.background = data("");

    this.handler = () => {
        console.log("handler triggered", this.name());
    };

    this.ref("p", (element) => (element.style.background = "red"));

    setTimeout(() => {
        this.ref();
        this.ref("p", (element) => (element.style.background = "green"));
        // this.name("edie");
        // this.background("red");
    }, 1000);

    return html`<p x-ref="'p'">
        Je m'appelle
        <span x-text="name() + ', ravi de vous voir' + subname"></span>
    </p>`;
});
