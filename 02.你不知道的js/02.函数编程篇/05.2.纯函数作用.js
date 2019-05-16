/**
 * 1. js很容易创建全局变量, 全局变量可以在所有函数内部访问, 函数可能会修改全局变量从而导致bug
 * 2. 纯函数的作用: 
 *    在函数内部创建一个局部变量, 把外部传递进来的形参copy一份进行处理并返回, 不修改外部变量的值, 避免了变量的异常修改
 *    单元测试, 不需要考虑上下文环境, 只需要考虑输入和输出
 */ 

// 案例: 数组的过滤
var person = [
  {name: '张三'},
  {name: '张三疯'},
  {name: '李四'},
  {name: '王五'}
]

// 过滤函数, 每次过滤的参数不同, 处理的初始值不能被修改  使用纯函数
// splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
// 因为修改了外部变量, person数组的数据被修改了, 所以下次再次调用函数处理person数组时, 就不是预期的结果了
function filterByText (text, arr) {
  arr.forEach(function (item, index, arr) {
    item.name.indexOf(text) != -1 ? arr.splice(index, 1) : ''
  })
  return arr;
}

// console.log(filterByText('张三', person));
// console.log(filterByText('', person));
// console.log(filterByText('', person));

// 纯函数 1. 创建内部变量 2. 遍历形参需要处理的数据 3. 把满足条件的放入局部变量中并return
function filterByText (text, arr) {
  var newArr = []
  var len = arr.length
  for (var i = 0; i < len; i++) {
    arr[i].name.indexOf(text) != -1 ? newArr.push(arr[i]) : ''
  }
  return newArr;
}

console.log( filterByText('张', person) )
console.log( filterByText('李', person) )
console.log( filterByText('王', person) )

