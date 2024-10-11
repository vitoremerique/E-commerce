
import Address from "./address";
import Costumer from "./Costumer"

describe("Costumer unit tests",()=>{

    it("should throw error when id is empty",()=>{
        expect (()=>{
            let costumer = new Costumer("","vitor");
        }).toThrowError("ID é requerido")
    })


    it("should throw error when name is empty",()=>{
        expect (()=>{
            let costumer = new Costumer("123","");
        }).toThrow("Name is required")
    })


    it("should change name",()=>{
        let costumer = new Costumer("654","Pedro");
        costumer.changeName("Vitor");
        expect(costumer.name).toBe("Vitor");
    })


    it("should activate costumer",()=>{
        let costumer = new Costumer("7654","Emerique")
        let address = new Address("111",10,"VFNDJS3","aLTAMIRA")
        costumer.Address=address

        costumer.activate();

        expect(costumer.isActive()).toBe(true)
    })

    it("should error when address is undefined",()=>{
        expect(()=>{
        let costumer = new Costumer("7654","Emerique")
            
        costumer.activate();
        }).toThrow("Address is required");
         
    })


    it("should desactivate costumer",()=>{
        let costumer = new Costumer("7654","Emerique")

        costumer.desactivate();

        expect(costumer.isActive()).toBe(false)
    })


})