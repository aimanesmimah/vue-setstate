import SetState from './setstate';

function plugin(Vue){
    if(plugin.installed){
        return 
    }

    plugin.installed= true


    Object.defineProperties(Vue.prototype,{
        $setState: {
            get(){
                var setState= new SetState(this)
                return setState.executeSetState.bind(setState)
            }
        }
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin