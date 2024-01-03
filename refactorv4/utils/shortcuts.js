/*
    Basic shortcuts for better minification
*/

export const dom = document;

export const customElementsDefine = (tag, manager) =>
    customElements.define(tag, manager);

export const documentCreateElement = (tag) => dom.createElement(tag);

export const elementCloneNode = (element, bool) => element.cloneNode(bool);
