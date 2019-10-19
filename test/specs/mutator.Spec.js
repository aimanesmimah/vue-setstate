import Mutator from '../../lib/mutator';
import { BehaviorSubject, Subject } from 'rxjs';

describe("Mutator prototype",()=>{
    beforeAll(function(){
        this.pevState= {
            name: "cloud",
            age: 20
        }

        this.payload= {
            name: "ayman" 
        }

        this.asyncPaylod= {
            name: "ayman", 
            age: 21 
        }

        this.mutator= new Mutator((prev)=> ({ ...this.payload }) , this.pevState )
        this.asyncMutator= new Mutator( async (prev)=> ({ ...this.asyncPaylod }), this.prevState )
    })

    it("has been initialized correctly",function(){
        expect(this.mutator).toEqual(jasmine.any(Mutator))
    })


    it('is mutator',()=>{
        expect(Mutator.is(function(){}))
    })

    it('is not async mutator',function(){
        expect(this.mutator.isAsync(this.pevState)).toBe(false)
    })

    it('is async mutator',function(){
        expect(this.asyncMutator.isAsync(this.prevState)).toBe(true)
    })

    it('subscribing to final value for async mutator',function(){
        /*this.asyncMutator=*/ 
        var asyncMutator= new Mutator( async (prev) => this.asyncPaylod , this.prevState )
        var observable= asyncMutator.finalValue()


        expect(observable).toEqual(jasmine.any(Subject))

        observable.subscribe(value=>{
            if(value){
                expect(Object.is(value,this.asyncPaylod)).toBe(true)
            }
        })


    })

    it('subscribing to final value for non async mutator',function(){
        var syncMutator= new Mutator( (prev) => this.payload, this.prevState )

        syncMutator.finalValue().subscribe(value=>{
            if(value){
                expect(Object.is(value,this.payload)).toBe(true)
            }
        })
    })
})