import ErrorHandler from './error';
import { Subject, BehaviorSubject } from 'rxjs';

function Mutator(handler,previousState){
    this._handler= handler 
    this._handlerValue= new BehaviorSubject(null)
    this._finalValue= new Subject()

    this._handlerValue.subscribe(value=>{
        if( !(value instanceof Promise) ){
            if(value === null ) return 
            if( !value ){
                ErrorHandler('return null to prevent state change')
                return 
            }
    
    
            if(typeof value !== 'object' || !(value instanceof Object)){
                ErrorHandler("state mutator payload has to be a js literal")
                return 
            }

            this._finalValue.next(value)
        }


    })

    if(this.isAsync(previousState)) this.execute()
}


Mutator.is= function(input){
    return input instanceof Function
}

Mutator.prototype.isAsync= function(prevState){
    this._handlerValue.next(this._handler(prevState))
    return this._handlerValue.getValue() instanceof Promise
}

Mutator.prototype.execute= async function(){
    this._handlerValue.next(await this._handlerValue.getValue())
}

Mutator.prototype.finalValue= function(){
    return this._finalValue
}

export default Mutator