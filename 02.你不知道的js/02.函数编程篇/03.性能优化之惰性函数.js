/**
 * 惰性函数:
 * 1. 常用于, 函数库的编写, 单例模式
 * 2. 案例: 写一个函数，返回首次调用的时间，注意是首次的时间，以后再次调用依然返回这个时间
 */

// 1. 版本1: 全局变量存储时间, 函数内部判断
var t = null
function getTime () {
  if (t) {
    return t;
  }
  return t = new Date().getTime()
}
console.log(getTime())
console.log(getTime())


/**
 * version1的缺点:
 * 1. 全局变量污染, 不符合纯函数的概念(不依赖，不修改函数作用域以外的变量)
 * 2. 函数内冗余的判断, 当调用一次后, t已经存在了, 就不需要每次调用函数都要判断一下
 */

// 2. version2: 
// 改进1: 把全局变量进行封闭, 避免变量暴露到全局环境, 污染全局作用域 ---> 使用闭包

var getTime = (function () {
  // t形成闭包,解决了全局变量污染的问题,把t变量放入了自执行函数中 但是不满足函数首次调用!!!
  var t = new Date().getTime()  
  // 必须要返回一个函数
  return function () {
    return t;
  }
})();

// 改进2: 把变量放入返回函数中,进行判断
// 解决了 1. 全局变量污染 2. 首次调用获取数据
var getTime = (function () {
  return function () {
    if (t) {
      return t;
    }
    return t = new Date().getTime()
  }
})();


// version3: 完美版
// 1. 函数也是一个变量, 当函数内部第一次计算完之后, 重新对函数进行定义, 即调用一次之后改变了函数的定义

var getTime = function () {
  var t = new Date().getTime()
  getTime = function () {
    return t;
  }
  // return t; // 第一次调用返回, 以后外部再次调用getTime, 调用的是上面的getTime函数定义, 永远返回t
  // 为了见名知意,return getTime函数的调用
  return getTime()
}

console.log(getTime())
console.log(getTime())
console.log(getTime())


/**
 * 惰性函数总结:
 * 1. 函数定义中, 使用闭包, 计算只初始化一次的值, 一般后续不需要判断直接使用该值
 * 2. 函数定义中, 重新对函数进行定义, 重定义的函数返回计算后的值
 * 3. 最终函数函数的调用
 * 4. 通过断点调试, 在test()处查看test的定义的变化以及值的变化
 */
// 在写一次
var test = function () {
  var t = new Date().getTime()
  test = function () {
    return t;
  }
  return test()
}
