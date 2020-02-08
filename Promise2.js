
var isMomHappy = false;

// Promise 1: 
var willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone); // fulfilled
        } else {
            var reason = new Error('mom is not happy');
            reject(reason); // reject
        }
    }
);



// Promise 2: 
// ###########    showOff is a function:
// ###################  Input: object  
// ###################  Output: Promise

var showOff = function (phone) {
    return new Promise(
        function (resolve, reject) {
            var message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone';

            resolve(message);
        }
    );
};

// To shorten Promise 2: 
// var showOff = function (phone) {
//     var message = 'Hey friend, I have a new ' + phone.color + ' ' + phone.brand + ' phone';
//     return Promise.resolve(message);
// };



// call our promise
var askMom = function () {
    willIGetNewPhone
        .then(showOff) // chain it here
        .then(function (fulfilled) {
                console.log(fulfilled);
             // output: 'Hey friend, I have a new black Samsung phone.'
            })
            .catch(function (error) {
                // oops, mom don't buy it
                console.log(error.message);
             // output: 'mom is not happy'
            });
};


askMom();