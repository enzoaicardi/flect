/*
    Basic shortcuts for better minification
*/

export const dom = document;

export const documentCreateElement = (tag) => dom.createElement(tag);

export const elementCloneNode = (element, bool) => element.cloneNode(bool);
