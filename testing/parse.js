/**
 * Created by anton on 26.09.16.
 */

// PRE JUNIOR

// 11 Напиши функцию parse(string),  (время выполнения 15-45  минут)
//  которая принимает аргументом query string, и возвращает объект.
//  Типы данных, которые должны распознаваться: строки, числа (только целые), булевы.

// var str = 'page=1&search=Paris';

function parse(string, delimiter) {
    var i, l, arg = [],
        del = delimiter || '&',
        temp = [], obj = {};

    temp = string.split(del);
    for (i = 0, l = temp.length; i < l; i++) {
        arg = temp[i].split('=');
        obj[arg[0]] = arg[1];
    }
    return obj;
}

// console.log('result = ', parse(str));

