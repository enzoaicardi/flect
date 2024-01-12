/*
    TODO -> explain
*/

import { signal } from "../reactivity/signal.js";

let currentLocation = location;

// retrieve the path after origin from an URL object
const getFormattedRoute = () =>
    currentLocation.pathname + currentLocation.search;

// signal of the currentRoute
export const currentRoute = signal(getFormattedRoute());

// add listener on popstate to update the currentRoute
// every time user get back or forward in history.
addEventListener("popstate", () => {
    currentLocation = location;
    currentRoute(getFormattedRoute());
});

// TODO -> remove
currentRoute.reactives.add(() =>
    console.log("the current route change", currentRoute.data)
);

/**
 * function used to navigate between routes
 * @param {string|Event} data
 */
export const navigate = (data) => {
    // if the argument is a string, navigate to the route
    if (typeof data === "string") {
        // update the currentLocation based on link
        currentLocation = new URL(data, currentLocation);
        // update the history based on new location
        history.pushState({}, "", currentLocation);
        // update the currentRoute signal based on new location
        currentRoute(getFormattedRoute());
    }
    // if the argument is not a string, it is considered as Event
    // this strategy can be used to manage routing in SPA context
    // without affecting the crawlers strategies
    else {
        // prevent the event execution on browsers
        data.preventDefault();
        // retrieve the href value of the element
        const link = data.currentTarget.href;
        // navigate to the corresponding route
        if (link) {
            return navigate(link);
        }
    }

    return getFormattedRoute();
};
