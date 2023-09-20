export function getDataAction(){
    return updateDataAction
}

function updateDataAction(_, element, pattern){
    element.datas || (element.datas = {})
    element.datas[pattern.attribute] = this.getValue(pattern)
}