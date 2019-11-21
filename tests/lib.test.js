
// npm i jest --save-dev

// modify "test" in package.json
// npm test

test('my first Node Test', () => {
    throw new Error('sth failed');
})

//-----------------------------------------------------------

const lib = require('./lib');
const db = require('./db');

describe('absolute', () => {
    it('Should return positive when input positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('Should return positive when input negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('Should return 0 when input 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});


describe('greet', () => {
    it('should return greeting msg', () => {
        const result = lib.greet('Nadjar');
        expect(result).toBe("Welcome Nadjar");
        expect(result).toMatch(/Nadjar/);
        expect(result).toContain('Nadjar');
    })
});



describe('getCurrency', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // Too general
        // expect(result).toBeDefined();
        // expect(result).not.toBeNull();


        // Too specific
        expect(result[0]).toBe('USD');
        expect(result.length).toBe(3);


        // Proper way
        expect(result).toContain('USD');
        expect(result).toContain('EUR');

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'AUD', 'USD']));
    });
});


describe('getProduct', () => {
    it('shoud return product with the given Id', () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({ id: 1, price: 10 });

        expect(result).toMatchObject({ id: 1, price: 10 });
        expect(result).toMatchObject({ price: 10 });

        expect(result).toHaveProperty('id', 1);
        expect(result).toHaveProperty('price', 10);
    });
});



describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        
        // what are falsy values in Javascript?
        // Null, undefined, NaN, '', 0, false

        // expect( () => { lib.registerUser(null) }).toThrow();


        const args = [null, NaN, undefined, '', 0, false];
        args.forEach(a => {
            expect( () => { lib.registerUser(a) }).toThrow()
        });
    });

    it('should return a user if valid username is passed', () => {
        const result = lib.registerUser('Mosh');
        
        expect(result).toMatchObject({ username: 'Mosh'});
        expect(result.id).toBeGreaterThan(0);
    });
});


describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {


        // you may override  db.getCustomerSync if needed:
        // db.getCustomerSync = function(customerId) {
        //     console.log('Fake reading customer -> mock function');
        //     return {id: customerId, points: 20};
        // }
        
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);

        expect(order.totalPrice).toBe(9);
    });
});



describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {

        db.getCustomerSync = function (customerId) {
            return { email:'a' };
        }

        let mailSent = false;

        mail.send = function(email, message) {
            mailSent = true;
        }


        lib.notifyCustomer({ customerId: 1 });
        expect(mailSent).toBe(true);
    });
});

// The better approach to create mock functions then the above `notifyCustomer` in Jest

describe('notifyCustomer2', () => {
    it('should send an email to the customer', () => {


        const mockFunction = jest.fn();
        // mockFunction.mockReturnValue(1);
        // const result = mockFunction();

        mockFunction.mockResolvedValue();
        //mockFunction.mockRejectedValue(new Error('--'));
        const result = await mockFunction();


        //-----------------------------------------------------------------------

        // db.getCustomerSync = function (customerId) {
        //     return { email:'a' };
        // }

        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send).toHaveBeenCalledWith('a', 'Your order was placed successfully');
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toBe('Your order was placed successfully');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});