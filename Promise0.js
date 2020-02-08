

// The code inside the Promise constructor runs when the promise is created 
// and it runs synchronously which surprises some people. 
// So even without then() everything still runs.

new Promise(resolve => console.log("running"))

console.log('===================');

new Promise(resolve => {
    console.log("promise created")
    setTimeout(() => console.log("this runs later"), 1000)
});

console.log('OK');

