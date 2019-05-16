/**
 * 好处:
 * 1. 参数复用
 * 2. 提前确认
 */

function add (x, y) {
  return x + y;
}

function addCurry (x) {
  return function (y) {
    return x + y
  }
}

function check (reg, text) {
  return reg.test(text)
}
console.log(check(/\d+/g, 'test'));   // false
console.log(check(/[a-z]+/g, 'test'));// true

function curryingCheck (reg) {
  return function (text) {
    return reg.test(text)
  }
}

var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]+/g)
console.log(hasNumber('hello2'));
console.log(hasLetter('hello'));

// 提前确认
// 提前确认执行环境中, 支持的绑定事件的方法

// var on = function (isSupport, element, event, handler) {
//   var isSupport = isSupport || document.addEventListener
//   if (isSupport) {
//     return element.addEventListener(event, handler, false)
//   } else {
//     return element.attachEvent('on' + event, handler)
//   }
// }

// var on = (function () {
//   if (document.addEventListener) {
//     return function (ele, event, handler) {
//       ele.addEventListener(event, hanlder, false)
//     }
//   } else {
//     return function (ele, event, handler) {
//       ele.attachEvent('on'+event, hanlder)
//     }
//   }
// })();

// 通用方法 -- 初步封装
// 通过闭包把初步参数给保存下来，然后通过获取剩下的arguments进行拼接，最后执行需要currying的函数

var currying = function (fn) {
  var args = [].slice.call(arguments, 1)
  return function () {
    var newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

function test (x, y, z) {
  return x + y + z;
}
var testCurry10 = currying(test, 10)
console.log(testCurry10(20, 30));

// 弊端
// 不支持多参数调用 currying(a)(b)(c)这样形式不支持, 使用递归再封装一层

// function processingCurry (fn, args) {
//   var length = fn.length      // 被包装函数的参数个数
//   var _this = this
//   args = args || []           // 如果有默认的参数

//   // 柯里化包装之后返回函数
//   return function () {
//     // 如果参数没有凑够个数
//     if (args.length < length) {
//       // args.concat(Array.prototype.slice.call(arguments))
//       Array.prototype.push.apply(args, Array.prototype.slice.call(arguments))
//       return processingCurry(fn, args)
//     }
//     // 满足了参数的个数,就执行函数fn, 并返回函数调用的结果
//     return fn.apply(this, args)
//   }
// }

// function progressCurrying (fn) {
//   var length = fn.length;
//   var newArgs = Array.prototype.slice.call(arguments, 1)  // 初步的参数列表
//   console.log(newArgs);
//   return function next () {
//     if (arguments.length < length - newArgs.length ) {
//       newArgs = newArgs.concat([].slice.call(arguments))
//       console.log(newArgs)
//       return next()
//     } else {
//       return fn.apply(this, newArgs)
//     }
//   }
// }

// var curryFun = progressCurrying(test, 1)
// console.log('----------');
// console.log(curryFun(2, 3))





