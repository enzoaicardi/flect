/*
    Mise en place d'un élément router simple qui peut accepter des routes (+ navigation)
    avec conditions et paramètres et qui permet l'affichage conditionnel de composants de pages
    -> a combiner avec lazy
    Mettre en place un composant de lien qui permet une navigation fluide avec le router

    const url = signal(currentURL)

    <x-route path="/music/([0-9]+)$">
        retourne les groupes dans datas.params
        <x-mapage x-params="params"></x-mapage>
    </x-route>

    <x-a href="/music/4">Mon lien</x-a>
    -> met a jour history
    -> met a jour url(newUrl)

    avoir un Flect.navigate()

    */

import { xElement } from "../classes/element";

class xRoute extends xElement {
    constructor() {
        super();
    }
    // executed on connectedCallback
    render() {}
}
