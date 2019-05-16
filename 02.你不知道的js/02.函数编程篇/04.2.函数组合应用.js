function compose() {
  // 取出函数数组
  var args = Array.prototype.slice.call(arguments)
  // 取出最后一个函数的下标
  var len = args.length - 1
  // 函数组合的返回值是一个函数, 该函数接收一个参数, 就是需要处理的数据
  return function (x) {
    // 第一次对数据x进行处理, 从函数数组的最后一个函数处理,依次由右向左
    var result = args[len](x)
    // while循环先判断len是否为真, 当len==0时退出循环, 先判断,后--,
    // 将第一次执行的结果作为下一个函数的输入 args[len](result)
    // util len == 0
    while (len--) {
      result = args[len](result)
    }
    // 最后返回多个函数处理的结果 result
    return result
  }
}

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