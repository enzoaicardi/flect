/**
 * @param {[String]} strings
 * @param  {...any} values
 * @returns {Template}
 */
function html(strings, ...values) {
    return {
        ["__type__"]: "template",
        strings,
        values,
    };
}

export { html };
