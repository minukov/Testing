/**
 * Created by anton on 26.09.16.
 */

// PRE JUNIOR

// 9 Написать функцию every(arr, func), (время выполнения 15-45  минут)
// которая принимает аргументами массив и функцию,
// вызывает для каждого элемента массива функцию с аргументами arr[i], i, arr.
// Если для каждого i-ого элемента массива func(arr[i], i, arr) вернула true, every должна вернуть true.

// function test(value,index,array) {
//     return (value%2 === 0);
// }

// var arr = [1,2,3,4,5,6,7,8],
//     func = test;

function every(arr, func) {
    var i, l = arr.length, result = true;
    for (i = 0; i < l; i++) {
        //result = func(arr[i], i, arr) && result;
        if (!func(arr[i], i, arr)) {
            return false;
        }
    }
    return result;
}

// console.log('result = ', every (arr,func));