/*
    TODO -> explain
*/

import { FLECT } from "../utils/types.js";

export const xAbstract = {
    setup(datas) {
        let self = this;

        /**
         * cacheDefinition can be used instead of static definition
         * @type {FLECT.Definition}
         */
        // self.cacheDefinition = self.cacheDefinition;

        /**
         * datas is used as a context for the render function
         * @type {FLECT.Element.Datas}
         */
        self.datas = self.datas || datas || {};

        /**
         * every time a directive run, we store the reactive function
         * inside dependencies at this.trail, theses dependencies can be
         * used to unhydrate a component or a sub set of elements
         * @type {FLECT.Dependencies.Trail}
         */
        self.trail = new Set();
    },

    /** @type {FLECT.Element.DisconnectCallback} */
    disconnectCallback() {
        this.unHydrate();
    },

    /**
     * Hydrate HTMLElements based on schema
     * @param {NodeList} nodeList
     * @param {FLECT.Schema} schema
     */
    hydrate(nodeList, schema) {
        let self = this;
        /** @type {FLECT.Definition} */
        for (const definition of schema) {
            /**
             * retrieve the HTMLElement from the index
             * @type {HTMLElement}
             */
            const element = nodeList[definition.index];

            // if the element is a Flect component we give the cache
            if (definition.reactive) {
                /** @type {FLECT.Definition} */
                element.cacheDefinition = definition;
                self.trail.add(element);
            }

            /**
             * loop over all hydratable attributes
             * @type {[string, FLECT.Action]}
             */
            for (const [name, action] of definition.attrs) {
                // apply the corresponding directive
                /** @type {FLECT.Reactive|undefined} */
                const reactiveFunction = action.directive(
                    self.datas,
                    element,
                    action.expression,
                    name
                );

                // push the reactiveFunction into component trail
                // only if the directive return a reactive function
                if (reactiveFunction) {
                    self.trail.add(reactiveFunction);
                }
            }

            // if the element is not a Flect component we hydrate children
            if (!definition.reactive && definition.schema) {
                self.hydrate(element.children, definition.schema);
            }
        }
    },

    /**
     * UnHydrate HTMLElements based on trail
     * @param {FLECT.Dependencies.Reactives} trail
     */
    // -> TODO -> voir dans quelle mesure un argument freeze serait utile
    // au lieu de delet reactive on passe a reactive.frozen = !reactive.frozen
    // et dans signal !reactive.frozen && reactive()
    // cela permettrait de geler et rétablir l'état d'un composant
    // mais utile dans quel cas de figure ? x-for ? x-if ? ssr ?
    unHydrate() {
        /** @type {FLECT.Reactive|FLECT.Element} */
        for (const reactive of this.trail) {
            reactive.disconnectCallback();
        }
        // clear the trail dependencies
        this.trail.clear();
    },
};
