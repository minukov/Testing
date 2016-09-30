/**
 * Created by anton on 26.09.16.
 */

// PRE JUNIOR

// 6 Написать функцию toQueryString(obj), (время выполнения 15 -45 минут)
//  которая принимает аргументом объект.
//  Значения в обьекте должны быть примитивами ( {page:1, search: ‘Paris’, …….})
//  и возвращает строку запроса вида page=1&search=Paris…….

// еще подадим на вход разделитель || &

// var obj = {1:10,2:20,3:30,4:40,5:50,6:60,7:70,8:80,9:90};

function toQueryString(obj, delimiter) {
    var result = '',
        del = delimiter || '&';

    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        result += key + '=' + obj[key] + del;
    }
    return result.substring(0, result.length - 1);
}

// console.log('result = ', toQueryString (obj));

