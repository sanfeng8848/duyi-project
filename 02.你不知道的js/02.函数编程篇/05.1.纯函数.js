/**
 * 纯函数: 
 * 1. 不依赖 不修改函数作用域之外的变量
 * 2. 函数如果没有返回值, 一定不是纯函数
 */

//////// 场景一 ////////// 
var num = 10
// 这个就不是纯函数, 因为依赖了外部变量num
function compare(x) {
  return x > num;   // 依赖外部变量 num
}
// 这个是纯函数, 没有依赖外部的变量
function compare(x) {
  return x > 10
}

// 这是纯函数, 因为预编译时, 函数内部的num, 是外界传递的实参num的一份copy, 函数执行完释放, 不修改
function compare(x, num) {
  // AO -> num
  return x > num;
}

//////// 场景二 ////////// 
// 引用值和原始值的区别, 参数如果是引用值, 可能就会对外界产生影响, 就可能不是纯函数

var arr = []
// 传入的数组, 引用值
function add(_arr) {
  var obj = { name: "sanfeng" }
  _arr.push(obj)
}
add(arr)  // 对外界的arr数组进行了修改

// 如何变成纯函数,函数内部 局部变量, 深度clone传入的参数, 对局部变量进行处理, 并返回
// 这样保证了 不影响，不依赖外部变量(无论是原始值还是引用值)

function add(arr) {
  var obj = { name: 'hello' }
  var _arr = []
  for (var i = 0; i < arr.length; i++) {
    _arr.push(arr[i])      // arr[i] 应该被深度clone再push到局部变量中 _arr.push(deepClone(arr[i]))
  }
  _arr.push(obj)
  return _arr;
}

var arr = [1, 2, { name: 'world' }]
var res = add(arr)
console.log(res);
console.log(arr)

// 纯函数
function add (x, y) {
  return x + y
}



