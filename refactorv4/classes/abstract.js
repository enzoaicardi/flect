/*
    TODO -> explain
*/

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

    // used to unHydrate the current element
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
             * @type {[String, FLECT.Action]}
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
    unHydrate() {
        /** @type {FLECT.Reactive} */
        for (const reactiveFunction of trail) {
            /** @type {FLECT.Dependencies.Signals} */
            for (const signalDependencies of reactiveFunction.signals) {
                // remove the function from the signal dependencies
                // by doing this signal will not trigger the function on change
                signalDependencies.delete(reactiveFunction);
            }
        }
        // clear the trail dependencies
        this.trail.clear();
    },
};
