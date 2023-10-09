export function proxyContext(){

    let proxy = {

        // datas is a global proxy object
        datas: false,

        // ctx are xElements
        _mapping: new Map(),

        // add xElement to context list
        use(ctx){
            if(ctx){
                this._mapping.set(ctx, 0)
                ctx.contexts.set(this, 0)
            }
            return this.datas
        },

        // remove xElement from context list
        disconnect(ctx){
            this._mapping.delete(ctx)
            ctx.contexts.delete(this)
        },

        set(target, dataName, value){

            // update the value first
            target[dataName] = value
            
            // update relateds datas proxys
            for(let [ctx] of this._mapping){
                ctx && ctx.datas && (ctx.datas[dataName] = value)
            }

            // return success
            return true

        }

    }

    proxy.datas = new Proxy({}, proxy)

    return proxy

}