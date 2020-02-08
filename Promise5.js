let name = "John";

setTimeout(() => {
   name = "Ali"; 
   console.log(name);
}, 1000);

console.log(name);