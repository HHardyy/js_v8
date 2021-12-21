var a = 1

function testFn() {
  var b = 2
  {
    let c = 3
    console.log(a, b, c)
  } {
    let c = 4
    console.log(a, b, c)
  }
}

testFn()