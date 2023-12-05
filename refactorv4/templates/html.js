function myComponent(html, data) {
    this.color = data("green");

    this.handleClick = () => {
        this.color("red");
    };

    return html`
        <div
            x-on:click="handleClick(event)"
            x-style="{
                background: color,
                border: '1px solid red'
            }"
            x-class="primary ? 'button-primary' : button"
            x-text="description"
        >
            <template x-if=""> ... </template>
            <template x-for=""> ... </template>
        </div>
    `;
}
