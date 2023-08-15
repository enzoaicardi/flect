export function visit(node, callback){

    let children = [...node.children]

    for(let x = 0; x < children.length; x++){

        let result = callback(node[x], x)

        if(result){
            visit(node[x], callback)
        }
        else if(result === false){
            break
        }

    }

}