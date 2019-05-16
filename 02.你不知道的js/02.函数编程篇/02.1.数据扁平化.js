/**
 * 数据扁平化: 将多为数组降维, 形成一维的数组[1,[2,[3,[4],5]]] --> [1,2,3,4,5]
 * [].concat: 拼接两个数组, 但是不会改变原有数组, 返回新的数组
 */
function flatten (arr) {
  var arr = arr || [],
      resArr = [],
      len = arr.length
  for (var i = 0; i < len; i++) {
    if (isArray(arr[i])) {
      // 不能保证数组的第i个元素就是一维的,
      // 即arr[i] = [1,2...],如果是arr[i] = [1,[2,3,[3,[5]]]], 直接使用concat就无法达到扁平化的功能
      resArr = resArr.concat(flatten(arr[i]))
    } else {
      // 如果不是数组
      resArr.push(arr[i])
    }
  }
  return resArr;
}

function isArray (obj) {
  return Object.prototype.toString.call(obj) == '[object Array]'
}

var testArr = [1,[2,[3,[4],5]]]

var res = flatten(testArr)
console.log(res)  // [ 1, 2, 3, 4, 5 ]



// 优化 挂载到数组的原型上
Array.prototype.flatten = function () {
  var resArr = [];
  this.forEach((item, index) => {
    Object.prototype.toString.call(item) === '[object Array]' ? resArr = resArr.concat(item.flatten()) : resArr.push(item);
  })
  return resArr;
}

// 使用reduce
function flattenReduce (arr) {
  var arr = arr || []
  return arr.reduce(function (prev, next, index, arr) {
    return Object.prototype.toString.call(next) === '[object Array]' ? prev.concat(flattenReduce(next)) : prev.concat(next)
  }, [])
}

// ES6 写法
const flattenes6 = 
  arr => arr.reduce((prev, next) => Object.prototype.toString.call(next) === '[object Array]' ? prev.concat(flattenes6(next)) : prev.concat(next), [])



var arr = [1, 2, 3, [4, 5, 6, [[[[7, 8, 9]]]]], null, {}, ['hello', [3, 4, 5, [6]]]]
// var res = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, {}, 'hello', 3, 4, 5, 6]

console.log(arr.flatten());
console.log(flattenReduce(arr));
console.log(flattenes6(arr));