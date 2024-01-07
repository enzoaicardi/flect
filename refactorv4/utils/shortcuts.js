/*
    Basic shortcuts for better minification
*/

export const dom = document;

export const documentCreateElement = (tag) => dom.createElement(tag);

export const elementCloneNode = (element, bool) => element.cloneNode(bool);

export const childNodesOf = (element) =>
    element.cacheChildNodes || element.childNodes;

export const childrenOf = (element) =>
    element.cacheChildren || element.children;
