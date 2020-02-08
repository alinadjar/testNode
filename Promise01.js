


const p = new Promise(resolve => {
    console.log("A")
    setTimeout(() => console.log("B"), 1000);
    resolve();  
});

p.then(() => {console.log('C')} );
console.log('D');



console.log('==========================');


const p2 = new Promise(resolve => {
    console.log("AA")
    setTimeout(() => console.log("BB"), 1000);
    //resolve();  
});

p2.then(() => {console.log('CC')} );
console.log('DD');

