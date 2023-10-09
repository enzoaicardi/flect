export function proxyContext(){

    let proxy = {

        // datas is a global proxy object
        datas: false,

        // ctx are xElements
        ctxMap: new Map(),

        // add xElement to context list
        use(ctx){
            this.ctxMap.set(ctx, 0)
            ctx.contexts.set(this, 0)
            return this.datas
        },

        // remove xElement from context list
        disconnect(ctx){
            this.ctxMap.delete(ctx)
            ctx.contexts.delete(this)
        },

        set(target, dataName, value){

            // update the value first
            target[dataName] = value

            // shortcut
            let ctxMap = this.ctxMap
            
            // update relateds datas proxys
            for(let [ctx, x] of ctxMap){
                ctx && ctx.datas && (ctx.datas[dataName] = value)
            }

            // return success
            return true

        }

    }

    proxy.datas = new Proxy({}, proxy)

    return proxy

}