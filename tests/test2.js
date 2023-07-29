
const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

function daysInMonth(year, month){
    return new Date(year, month, 0).getDate();
}

define('calendar', function(datas, render){

    let date = new Date();

    this.effect('month', value => {
        datas['days'] = daysInMonth(datas['year'], value+1)
        datas['monthName'] = monthNames[value]
    });

    datas['year'] = date.getFullYear();
    datas['month'] = date.getMonth();
    
    this.iterable('days', 'iterable');

    // datas['events'] = [] // todo recupérer l'ensemble des evenements
    // datas['days'] = [] // todo pour chaque jour ajouter les evenements correspondants, sinon jour = objet vide

    render(datas['body'])

    this.custom.nextMonth = function(){
        if(datas['month'] === 11) { datas['month'] = 0; datas['year']++; }
        else datas['month']++;
    }

    this.custom.previousMonth = function(){
        if(datas['month'] === 0) { datas['month'] = 11; datas['year']--; }
        else datas['month']--;
    }

});


define('day', function(datas, render, style){

    this.effect('index', value => datas['day'] = Number(value) + 1);

    style($ => `${$} { background-color: red; }`);
    render(`
    <div class="x-day" x-text="day">
        I'm a day
    </div>`);

})