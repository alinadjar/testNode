function asyncTask(i) {
    return new Promise(resolve => resolve(i + 1));
}


// async function runAsyncTasks() {
//     const res1 = await asyncTask(0);
//     const res2 = await asyncTask(res1);
//     const res3 = await asyncTask(res2);
//     return "Everything done"
// }


function runAsyncTasks() {
    return asyncTask(0)
        .then(res1 => { console.log(res1);  return asyncTask(res1); })
        .then(res2 => { console.log(res2);  return asyncTask(res2); })
        .then(res3 => { console.log(res3); return "Everything done"; });
}

runAsyncTasks().then(result => console.log(result));


// console.log( runAsyncTasks() );