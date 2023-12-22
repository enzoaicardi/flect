import Flect from "../../bundle.js";

Flect.define("p", function (data, html, css) {
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
        <span x-css="uwu">mario</span>
        <span x-css="owo">Luigi</span>
    </p>`;
});

Flect.define("q", function (data, html, css) {
    this.ref("p", (element) => (element.style.background = "blue"));

    setTimeout(() => {
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
