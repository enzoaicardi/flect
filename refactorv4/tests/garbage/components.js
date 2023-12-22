import Flect from "../../bundle.js";

let context = Flect.signal("no name...");

Flect.define("p", function (signal, html, css) {
    this.name = context;
    this.ref("p", (element) => (element.style.background = "red"));

    setTimeout(() => {
        this.ref("p", (element) => (element.style.background = "green"));
    }, 1000);

    css`
        [${css("uwu")}] {
            background: yellow;
        }
        [${css("owo")}] {
            background: blue;
            color: white;
        }`;

    return html`<p x-ref="p">
        Je m'appelle
        <span x-css="uwu" x-text="name()">mario</span>
        <span x-css="owo">Luigi</span>
    </p>`;
});

Flect.define("q", function (signal, html, css) {
    this.name = context;
    this.ref("p", (element) => (element.style.background = "blue"));

    setTimeout(() => {
        this.name("Fabrice");
        this.ref("p", (element) => (element.style.background = "yellow"));
    }, 1000);

    css`
        [${css("uwu")}] {
            background: green;
        }
        [${css("owo")}] {
            background: red;
            color: white;
        }`;

    return html`<p x-ref="p">
        Je m'appelle
        <span x-css="uwu">JACK</span>
        <span x-css="owo">RAYAN</span>
    </p>`;
});
