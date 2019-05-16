/**
 * 将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术
 * 1. 调用形式
 *  function add (x, y, z) {...}
 *  var fn = Curry(add)   // 柯里化函数包裹一个普通函数
 *  fn(1)(2)(3)     // 调用
 */

// 前奏 
// 1. 一个基础函数,包含固定参数个数的函数 fn(a,b,c,d)
// 2. 一个包装函数, 这个函数返回一个函数  var fnCurry = curry(fn, a, b)
// 3. 函数调用传递时,把剩余参数传入 fnCurry(c, d)

function add(a, b, c, d) {
  return a + b + c + d;
}

function FixParamsCurry(fn) {
  var _args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var newArgs = _args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

// var fn = curry(add, 1, 2)
// console.log( fn(3, 4) )

// 
// 

/**
 * 柯里化函数  传入的参数必须是固定参数的函数
 * 并且不要求执行几次, 一次可以, 多次调用也可以, 但是必须保证参数的个数累计和与基础函数的参数个数一致
 * 调用形式
 * var newAdd = Curry(add)
 * newAdd(1,2,3,4)      1次
 * newAdd(1)(2,3)(4)    3次
 * ...
 */

function Curry(fn, length) {
  // 期望的被包裹函数的参数个数
  var length = length || fn.length
  return function () {
    // 如果传递的参数个数小于指定的函数个数
    if (arguments.length < length) {
      // 凑齐fn函数的参数个数, 并形成数组 [fn, ...args]
      var combined = [fn].concat([].slice.call(arguments))
      // FixParamsCurry.apply(this, combined)   如果调用第二次依然没有凑齐参数个数, 就继续凑齐
      return Curry(FixParamsCurry.apply(this, combined), length - arguments.length)
    } else {
      return fn.apply(this, arguments)
    }
  }
}

var newAddCurry = Curry(add)

console.log(newAddCurry(1, 2, 3, 6));
console.log(newAddCurry(1)(2)(3,4));
