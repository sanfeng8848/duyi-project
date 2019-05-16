/**
 * 函数的运算需要上一次函数运算的结果
 * 在处理一部分的事务,可能会有一些重叠,希望把结果存起来
 * 函数编程的基本组成, 代码模块化, 重用性更好
 */
var count = 0

function factorial (n) {
  count++
  if (n == 0 || n == 1) {
    return 1
  }
  return n * factorial(n-1)
}

// for (var i = 1; i <=5; i++) {
//   console.log( factorial(i) )
// }
factorial(5)
console.log(count);   // factorial(5) 函数调用了15次

// versoin1

// 全局变量存储递归的结果
var cacheMemorize = []
var countMemorize = 0
// 实现了函数记忆功能的递归函数
function factorialMemorize (n) {
  countMemorize++
  if (cacheMemorize[n]) {
    return cacheMemorize[n]
  } else {
    if (n == 0 || n == 1) {
      cacheMemorize[0] = 0
      cacheMemorize[1] = 1
      return 1
    } else {
      cacheMemorize[n] = n * factorialMemorize(n-1)
      return n * factorialMemorize(n-1)
    }
  }
}

for (var i = 1; i <= 5; i++) {
  console.log(factorialMemorize(i));
}
// console.log(factorialMemorize(5));
console.log(countMemorize)

// 优化上面的代码


