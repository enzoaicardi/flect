export let testRegistry = { 'global': {} };
let testCategory = 'global';

export function category(name){
    testRegistry[testCategory] = {};
    testCategory = name;
}

export function test(name, testFunction){
    testRegistry[testCategory][name] = testFunction;
}

export function run(datas, category, name){

    let testFunction = testRegistry[category][name];
    let checkList = [];
    
    function check(conditionFunction){
        checkList.push(conditionFunction())
        datas['result'] = checkList;
    }

    function finish(){
        datas['result'] = checkList;
        datas['finish'] = true;
    }

    testFunction(datas['view'], check, finish);

}