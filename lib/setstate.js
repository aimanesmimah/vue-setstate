import  Mutator  from './mutator';
import ErrorHandler from './error' ;


/**
 * 
 * @description library constructor and prototype initializer function 
 * @param {Object} VueInstance the vue instance or vue component object within which setState was called 
 */

function SetState(VueInstance){
    if(!VueInstance._isVue) ErrorHandler('Invalid vue component')
    this.component= VueInstance
    this.previousState= ''
    this.currentState= ''
    this.onFinish= '' 
    this.newState= null
}


var proto= SetState.prototype

/**
 * @description 
 * @param {Object || Function} args new state payload
 * @param {Function} onFinish callback that executes after dom re-rendering and takes previous and new state as arguments
 */

proto.executeSetState= function(args,onFinish){
    this.previousState= Object.assign({},this.component._data)
    this.currentState= null
    this.onFinish= onFinish 

    
    if(typeof args === 'object' && args instanceof Object){
        this.newState= args
        this.setComponentState()
    }
    else if(Mutator.is(args)){
        new Mutator({ handler: args, prevState: this.previousState },value => {
            this.newState= value
            this.setComponentState()
        })
    }
    else this.setComponentState()
}

proto.setComponentState= function(){
    if(this.newState === null) return this.executeOnFinish()
    
    var keys= Object.keys(this.newState)
    if(keys && keys.length && this.component.hasOwnProperty('_data')){
        for(let key of keys){
            if(!this.component._data.hasOwnProperty(key)) delete this.newState[key]
        }

        Object.assign(this.component._data,this.newState)

        this.currentState = Object.assign({},this.component._data)
        this.executeOnFinish()
    }
}

proto.executeOnFinish= function(){
    if(this.onFinish && typeof this.onFinish === 'function'){
        process.nextTick(()=>{
            if(this.newState)
                this.onFinish(this.previousState,this.currentState)
            else 
                this.onFinish(this.previousState)
        })
    }
}


export default SetState