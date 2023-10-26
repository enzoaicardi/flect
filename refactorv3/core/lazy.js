/*

*/

import { isXElement } from "../utils/utils-tests.js";

// registry to store all components url {component: './path'}
let registry = {}
let observer;

// assign unreached components url
export function lazy(componentsUrl){

    // update registry
    registry = Object.assign(componentsUrl, registry)

    // setup observer
    setupLazyObserver()

}

function setupLazyObserver(){

    if(observer) return;

    // create observer and observe documentElement
    observer = new MutationObserver(lazyObserverCallback)

    // TODO -> check si besoin de tout observer car element se supprime tout seul
    // donc ajouté puis supprimé, donc peut etre pas besoin de tester certaines choses
    observer.observe(
        document.documentElement,
        {
            attributes: false,
            childList: true,
            subtree: true
        }
    );

}

// this callback is executed on every mutation
function lazyObserverCallback(mutations){

    for(let mutation of mutations) {

        // for each subelement mutation
        if(mutation.type === 'childList'){

            // check added nodes
            for(const node of mutation.addedNodes){

                let tag;

                // if node is still in registry
                if(node.nodeType === 1 && isXElement(node) && registry[(tag = node.tagName.toLowerCase().substring(2))]){

                    // import corresponding js file
                    // TODO -> relative url start by /core/
                    // Syntax {element: ()=>import(url)} ?
                    import(registry[tag])

                    // mark the entry as false to fire only once
                    registry[tag] = false

                }

            }

        }

    }

}