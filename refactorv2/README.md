
setTimeout semble meilleur que Promise.resolve().then()
car les microtaches s'executent les unes a la suite des autres ce qui semble laisser le navigateur "freeze"
a l'inverse chaque tache settimout semble s'executer de manière indépendante et dont on a plus un "shutter"

Il faut trouver le moyen de capturer les références de manière asynchrone pour les récupérer en front

TODO
- intégrer settimout sur les taches lourdes et redondantes
- gérer différemment le rendu en le séparant des datas (pour eviter une execution + pouvoir timeout le rendu ?)
- recurérer les références meme de maniere asynchrone ?