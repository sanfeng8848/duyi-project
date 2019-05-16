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
