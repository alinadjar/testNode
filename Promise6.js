let name = "John";

// new Promise((resolve, reject) => {

//         name = 'Ali';
//         console.log(name+' 1');
//         resolve();
// })


const p = new Promise((resolve, reject) => {

        name = 'Ali';
        console.log(name+' 1');
        resolve();
});

const x = p.then(() => console.log('-----------------'));
console.log('x = '+ x)



// const p = Promise.resolve(name);
// p.then(x => console.log(x))
//  .catch(err => console.log(errs))



console.log(name+ ' 2');