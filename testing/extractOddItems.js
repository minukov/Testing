/**
 * Created by anton on 26.09.16.
 */

// PRE JUNIOR

// 2 Создай функцию extractOddItems(arr) (время выполнения 15 - 45 минут)
// которая принимает аргументом массив или массивоподобный объект, и возвращает новый массив,
// в котором находятся только элементы с нечетным индексом.

// var arr = [1,2,3,4,5,6,7];
// var arr = '123456';

function extractOddItems(arr) {
    var i, l = arr.length,
        result = [];
    for (i = 0; i < l; i++) {
        if (i % 2 === 0) {
            continue;
        }
        result.push(arr[i]);
    }
    return result;
}

// console.log('result = ', extractOddItems (arr));

