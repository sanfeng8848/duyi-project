/**
 * 知识点补充
 * let fn = function (prev, next, index, arr) {}
 * Array.prototype.reduce(fn, initValue)
 * 处理数组中的每个元素, 从左到右进行累加处理, 处理完前面的结果作为下一次的处理的输入
 */

function compose() {
  var args = Array.prototype.slice.call(arguments)
  return function (x) {
    return args.reduceRight(function (result, cb) {
      return cb(result)
    }, x)
  }
}

// ES6写法
const composeES6 = (...args) => x => args.reduceRight((res, cb) => cb(res), x)

function composeSortByASC() {
  var args = Array.prototype.slice.call(arguments)
  return function (x) {
    return args.reduce((res, cb) => {
      return cb(res)
    }, x)
  }
}

// let arr = [1,2,3,4,5,6,7,8]
// let res = arr.reduce(function (prev, next) {
//   return prev += next
// })
// console.log("res --> ", res)

// 组合的纯函数
function toUpperCase(str) {
  return str.toUpperCase()
}
function split(str) {
  return str.split('')
}
function reverse(arr) {
  return arr.reverse()
}
function join(arr) {
  return arr.join('-')
}
function addQuestionMark(str) {
  return str + '?'
}

var fn = compose(addQuestionMark, join, reverse, split, toUpperCase)
console.log(fn('hello'));

var f1 = composeES6(addQuestionMark, join, reverse, split, toUpperCase)
console.log(f1('world'));


var f2 = composeSortByASC(toUpperCase, split, reverse, join, addQuestionMark)
console.log(f2('hello'));