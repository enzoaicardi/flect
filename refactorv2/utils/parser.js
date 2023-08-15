export let xparser = new DOMParser()

export function xparse(html){
    return xparser.parseFromString(html, 'text/html').body
}