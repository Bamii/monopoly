const { reporters } = require("mocha");

class person {
  constructor(){
    this.test1();
  }

  test1() {
    console.log(this);
    console.log()

    Array.from([1,2]).forEach(() => {
      console.log(this);
    })
  }
}

// const p = new person();

function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

ListNode.prototype.toString = function() {
  function recurse(list){
    return  list == null ? "" : `${list.val} ${recurse(list.next)}`
  }
  return recurse(this);
}

var reverseKGroup = function(head, k) {
  if (k==1) return head
  let c = 1;
  let checkpoint;
  let reordered = new ListNode(head.val)
  let tail = reordered
  let prevTail = null
  let remainder = head.next
  let main = null
  
  while((remainder != null) && (c < k)) {
    reordered = new ListNode(remainder.val, reordered)
    remainder = remainder.next
    c++
    if(remainder != null && c == k) {
      c = 1;

      if(!main) main = reordered
      if(prevTail) prevTail.next = reordered

      reordered = new ListNode(remainder.val)
      prevTail = tail
      tail = reordered

      checkpoint = new ListNode(remainder.val, remainder.next)
      remainder = remainder.next
    }

    console.log(reordered)
    if(remainder==null) {
      c == k 
        ? main = reordered
        : prevTail.next = checkpoint
    }
  }

  return main
};

let heads = null;
[1,2,3,4].reverse().forEach((curr) => { heads = new ListNode(curr, heads) });

console.log(reverseKGroup(heads, 2).toString())