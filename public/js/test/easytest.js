describe("testing karma", function () {
    
    it("1=1", inject(function () {        
        expect(1).toBe(1);
    }));
    it("1=0", inject(function () {        
        expect(1).toBe(0);
    }));    
});