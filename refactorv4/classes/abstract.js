/*
    TODO -> explain
*/

import { immutableChildrenOf } from "../utils/shortcuts.js";
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
     * @param {FLECT.Dependencies.Trail} trail
     */
    hydrate(nodeList, schema, trail) {
        let self = this;

        /** @type {number} */
        let index = schema.length - 1;

        /**
         * we need immutableTrail as a duplicate of trail because changing trail
         * inside the while loop will influence sibling elements as a side effect
         * @type {FLECT.Dependencies.Trail}
         */
        let immutableTrail = trail;

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
            const element = nodeList[definition.pos];

            if (definition.reactive) {
                // we pass the current schema as immutableSchema
                // avoiding the creation of a new schema and it's performance cost
                element.immutableSchema = definition.schema;

                // we add the current element into the component trail
                (trail || self.trail).add(element);
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

            if (definition.schema) {
                // check if the element is hydratable and update the trail at same time
                // trail should be updated only if the element is reactive
                const ishydratable =
                    !definition.reactive ||
                    (immutableTrail =
                        !isDefined(element) && (element.trail = new Set()));

                // if the element is not a Flect component we hydrate children
                if (ishydratable) {
                    self.hydrate(
                        immutableChildrenOf(element),
                        definition.schema,
                        immutableTrail
                    );
                }
            }

            index--;
        }
    },

    /**
     * UnHydrate HTMLElements based on trail
     * @param {FLECT.Dependencies.Reactives} trail
     */
    unHydrate() {
        /** @type {FLECT.Reactive|FLECT.Element} */
        for (const reactive of this.trail) {
            reactive.disconnectCallback && reactive.disconnectCallback();
        }
        // clear the trail dependencies
        this.trail.clear();
    },
};
