import terser from "@rollup/plugin-terser";

export default {
    input: "refactorv4/bundle.js",
    output: {
        file: "dist/flect.js",
        format: "iife",
        name: "Flect",
    },
    plugins: [
        terser({
            mangle: {
                properties: {
                    reserved: [
                        "connectedCallback",
                        "onMount",
                        "onUnmount",
                        "component",
                        "ref",
                        "data",
                    ],
                },
            },
        }),
    ],
};
