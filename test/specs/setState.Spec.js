import SetState from '../../lib/setstate';


var vueInstanceMock= {
    '_isVue': true,
    '_data': {
        name: "cloud",
        age: 20
    }
}

describe('SetState prototype', () => {
    beforeAll(function(){

        this.setstate= new SetState(vueInstanceMock)
    })

    it('setstate initialized correctly',function(){
        expect(this.setstate).toEqual(jasmine.any(SetState))
        
        try{
            var setState= new SetState(vueInstanceMock)
        }
        catch(error){
            expect(error).not.toBeNull()
        }
    })

});


describe("set state on finish method",()=>{
    var handlers;
    beforeEach(function(done){
        this.prev;
        this.currentState;
        handlers= {
            onfinish: (prevState,currentState)=>{
                this.prev= prevState
                this.currentState= currentState
                done()
            },
            setComponentState: ()=>{
                done()
            }
        }

        spyOn(handlers,"onfinish").and.callThrough()
        spyOn(handlers,"setComponentState").and.callThrough()


        SetState.prototype.setComponentState= handlers.setComponentState
        this.setstate= new SetState(vueInstanceMock)


        this.setstate.onFinish= handlers.onfinish
        this.setstate.executeOnFinish()
        
    })

    it('executes onFinish method',function(){
       expect(this.setstate.executeOnFinish.bind(this.setstate)).not.toThrow()
       expect(handlers.onfinish).toHaveBeenCalled()
       expect(handlers.onfinish).toHaveBeenCalledTimes(1)

       expect(this.prev).toEqual('')
       expect(this.currentState).toBeUndefined()

    })

    it('component set state methods',function(){

    })
})