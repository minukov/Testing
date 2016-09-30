/**
 * Created by anton on 26.09.16.
 */

// PRE JUNIOR

// 5 Дописать функцию toMatrix(data, rowSize), (время выполнения 15 -45  минут)
//  которая принимает аргументом массив и число, возвращает новый массив.
//  Число показывает количество элементов в подмассивах, элементы подмассивов берутся из массива data.
//  Оригинальный массив не должен быть изменен.

// var data = [1,2,3,4,5,6,7,8,9];
// var rowSize = 2;

function toMarix(data, rowSize) {
    var j = 0, i, l = data.length, temp = [],
        result = [];

    for (i = 0; i < l; i++) {
        temp[j] = data[i];
        j++;
        if (j !== rowSize) {
            continue;
        }
        result.push(temp);
        j = 0;
        temp = [];
    }
    if (temp.length > 0) {
        result.push(temp);
    }
    return result;
}

// console.log('result = ', toMarix (data, rowSize));