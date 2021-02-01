let be = true;

while(go()) {
  console.log('isj')
  setTimeout(() => {
    setgo();
  }, 1000);
}

// for(let i = false; i != be;) {
//   console.log("isj");
//   setTimeout(() => {    
//     i = true;
//   }, 1000)
// }

console.log("done")
 
function go() {
  return be;
}

function setgo() {
  be = false;
}
