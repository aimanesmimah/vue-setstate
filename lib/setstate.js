// TODO 
// state history


/**
 * 
 * @description library constructor and prototype initializer function 
 * @param {Object} VueInstance the vue instance or vue component object within which setState was called 
 */

function SetState(VueInstance){
    if(!VueInstance._isVue) this.raiseError('Invalid vue component')
    this.component= VueInstance
    this.previousState= ''
    this.currentState= ''
    this.onFinish= '' 
    this.newState= ''
}


var proto= SetState.prototype

/**
 * @description 
 * @param {Object || Function} ags new state payload
 * @param {Function} onFinish callback that executes after dom re-rendering and takes previous and new state as arguments
 */

proto.executeSetState= function(args,onFinish){
    this.previousState= Object.assign({},this.component._data)
    this.currentState= null
    this.onFinish= onFinish 
    this.newState= typeof args === 'object' && args instanceof Object ? args: 
                                      typeof args === 'function' ? args(this.previousState): null

    this.setComponentState()
}

proto.setComponentState= function(){
    if(this.newState === null) this.executeOnFinish()
    else if(!this.newState) this.raiseError('null has to be returned for preventing update')
    else {
        if( typeof this.newState === 'object' && this.newState instanceof Object){
            var keys= Object.keys(this.newState)
            if(keys && keys.length && this.component.hasOwnProperty('_data')){
                for(let key of keys){
                    if(!this.component._data.hasOwnProperty(key)) delete this.newState[key]
                }

                Object.assign(this.component._data,this.newState)
        
                this.currentState = this.component._data
                this.executeOnFinish()
            }
        }
        else this.raiseError('state payload should be of type object')
    }
}

proto.executeOnFinish= function(){
    if(this.onFinish && typeof this.onFinish === 'function'){
        setTimeout(()=>{
            if(this.newState)
                this.onFinish(this.previousState,this.currentState)
            else 
                this.onFinish(this.previousState)
        },0)
    }
}

proto.raiseError= function(text){
    throw new Error(`vue-setstate error: ${text}`)
}

export default SetState