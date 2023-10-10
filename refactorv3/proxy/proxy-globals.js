/*

*/

export function buildProxy(object, proxy){
    return new Proxy(object, proxy)
}