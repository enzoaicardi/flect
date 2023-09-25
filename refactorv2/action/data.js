
// when a data is updated, we also update the data of sub-element
export function updateDataAction(_, element, pattern){
    element.datas || (element.datas = {})
    element.datas[pattern.attribute] = this.getValue(pattern)
}