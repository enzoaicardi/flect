/*
    TODO -> explain
*/

import { isDefined } from "../utils/tests.js";
import { FLECT } from "../utils/types.js";

export const xAbstract = {
    setup(datas) {
        let self = this;

        /**
         * immutableChildren can be used instead of template for hydration
         * @type {NodeList}
         */
        // self.immutableChildren = [];

        /**
         * immutableSchema can be used instead of creating schema
         * @type {FLECT.Schema}
         */
        // self.immutableSchema = [];

        /**
         * datas is used as a context for the render function
         * @type {FLECT.Element.Datas}
         */
        self.datas || (self.datas = datas || {});

        /**
         * every time a directive run, we store the reactive function
         * inside dependencies at this.trail, theses dependencies can be
         * used to unhydrate a component or a sub set of elements
         * @type {FLECT.Dependencies.Trail}
         */
        self.trail || (self.trail = new Set());
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
    hydrate(nodeList, schema, trail) {
        let self = this;

        /** @type {number} */
        let index = schema.length - 1;

        // we play the schema in reverse order because the nodeList
        // can change during the hydration process by adding or removing
        // elements at the current index, so next indexes could change
        // for that reason we must use previous indexes
        while (index >= 0) {
            /** @type {FLECT.Definition} */
            const definition = schema[index];

            /**
             * retrieve the HTMLElement from the index
             * @type {HTMLElement}
             */
            const element = nodeList[definition.index];

            // console.log(">>> hydrate element", element);
            if (definition.reactive) {
                // we pass the current schema as immutableSchema
                // avoiding the creation of a new schema and it's performance cost
                element.immutableSchema = definition.schema;

                // we add the current element into the component trail
                (trail || self.trail).add(element);

                // trail =
                //     !element.content &&
                //     !isDefined(element) &&
                //     (element.trail = new Set());
            }

            if (!trail) {
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
            }

            // if the element is a Flect element or template
            if (definition.reactive) {
                // update the trail value
                // used to pass immutableSchema through non-defined components
                trail =
                    !element.content &&
                    !isDefined(element) &&
                    (element.trail = new Set());
            }

            // if the element is not a Flect component we hydrate children
            if ((trail || !definition.reactive) && definition.schema) {
                // console.log(
                //     ">>> explore children",
                //     element.immutableChildren || element.children,
                //     definition.schema
                // );
                self.hydrate(
                    element.immutableChildren || element.children,
                    definition.schema,
                    trail
                );
            }

            index--;
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
            reactive.disconnectCallback && reactive.disconnectCallback();
        }
        // clear the trail dependencies
        this.trail.clear();
    },
};
