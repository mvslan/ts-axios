var f3 = function() {
  console.log(this.a)
  var f = () => {
    console.log(this.a)
  }
  f()
}

f3.call({ a: 1 })

f3.call({ a: 2 })
