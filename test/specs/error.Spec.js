import ErrorHandler from '../../lib/error';



describe("error handler",()=>{
    it('is function',()=>{
        expect(ErrorHandler).toEqual(jasmine.any(Function))
    })

    it('handler to throw error',()=>{
        expect(ErrorHandler).toThrow()
    })

    it('handler to throw error string',()=>{
        try {
            ErrorHandler("error")
        } catch (error) {
            expect(error.constructor.name).toEqual("Error")
            expect(error.message).toEqual(`vue-setstate error: error`)
        }
    })
})