function doSomethingAsynchronous() {
    return new Promise((resolve) => {
        console.log("a");
        resolve("promise result");
    });
}


doSomethingAsynchronous();
console.log("b");


console.log('=========================');
// The result of the Promise is retained, to be released to a 'then' call for example:

doSomethingAsynchronous()
        .then((result) => { console.log("c:" + result) });
console.log("b");

// output:


// The reason why 'a', 'b' and 'c' are printed in that order is
// because no matter whether code in the body is async or sync, 
// the 'then' method is always called asynchronously by the Promise. 

// In my mind, I imagine the 'then' method being invoked by something like setTimeOut