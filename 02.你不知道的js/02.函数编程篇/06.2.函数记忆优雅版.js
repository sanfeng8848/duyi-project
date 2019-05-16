/**
 * 函数记忆
 * 通过函数闭包的形式,定义一个结构,将变量私有化,实现这个函数独有的缓存区,用来缓存以后用到的数据(保存结果)
 * 
 */

// 1. 需要被包装为记忆功能的函数  如, 递归函数
function factorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  }
  return n * factorial(n - 1)
}


function memorize (fn) {
  var cache = {}
  // 返回的函数的形参不定
  return function () {
    var key = arguments.length + Array.prototype.join.call(arguments)
    if (cache[key]) {
      return cache[key]
    } else {
      cache[key] = fn.apply(this, arguments)
      return cache[key]
    }
  } 
}

var fn = memorize(factorial)
console.time('no M');
console.log(factorial(10))
console.timeEnd('no M')

console.time('1 M')
console.log(fn(10))
console.timeEnd('1 M')

console.time('2 M')
console.log(fn(10))
console.timeEnd('2 M')
