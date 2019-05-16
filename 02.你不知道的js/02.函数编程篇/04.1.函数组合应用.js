/**
 * 函数组合是函数式编程的高阶部分, 函数组合可以由若干个
 *  纯函数,
 *  偏函数,
 *  curry函数
 * 组合成一个新的函数, return fn
 * 同时形成数据传递的函数, 右倾(从右向左执行函数, 并传递数据)
 */

/**
 * 1. 两个参数为纯函数,偏函数,柯里化的函数
 * 2. 外层函数执行之后返回一个函数,函数内部依次从右向左调用形参中函数,也称为左倾
 *    内部函数的参数x,首先传递给函数g, 执行g函数处理x数据,将结果传递给f函数, 并返回
 * 3. 实现了,数据处理的从右向左传递
 * @param {fn} f 
 * @param {*} g 
 */
function compose (f, g) {
  return function (x) {
    return f(g(x))
  }
}

// 1. 实现功能: 对字符串转换成大写, 并对字符串结尾加上?
/**
 * 1. 编写两个纯函数(不依赖外部作用域,并且不改变外部作用域的变量)
 *    1.1. 实现uppercase
 *    1.2. 实现添加?
 * 2. 注意参数的顺序 先被执行的函数, 放在compose函数的最右侧
 */

function toUpperCase (str) {
  return str.toUpperCase()
}
function addQuestionMark (str) {
  return str + '?'
}
// 字符串拆分, 返回值为数组
function split (str) {
  return str.split('')
}
// 数组倒叙
function reverse (arr) {
  return arr.reverse()
}
// 数组拼接, 形成字符串
function join (arr) {
  return arr.join('-')
}

// 具有普遍意义的函数组合
// 1. 参数不固定

function compose () {
  // 类数组转换为数组, 保存了所有的函数列表
  var args = Array.prototype.slice.call(arguments)
  var len = args.length - 1;    // 计算数组的最后一个元素(函数)的下标
  // 返回一个函数,对参数x依次添加处理函数
  return function (x) {
    // 取出最后一个函数并执行, 返回一个结果, 将结果传递给下一个函数(函数数组列表中的倒数第二个函数)
    var result = args[len](x)
    while (len--) {
      result = args[len](result)
    }
    return result;
  }
}

// 组合所有的纯函数
// 过程: toUpperCase -- split -- reverse -- join -- addQuestionMark
var fn = compose(addQuestionMark, join, reverse, split, toUpperCase);
var res = fn('hello')
console.log(res)