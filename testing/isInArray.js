/**
 * Created by anton on 26.09.16.
 */

// PRE JUNIOR

// 7 Написать функцию isInArray(), (время выполнения 15 -45 минут)
// которая принимает переменное количество аргументов.
// Возвращает true, если все аргументы, кроме последнего входят в последний.

//    ??????????????? проверять ли типы входных аргументов
// берем из  П.1

function isInArray() {
    var i, l = arguments.length - 1, what = [],
        where = arguments[l];

    if (!(where instanceof Array)) {
        return false;
    }
    // через var args = Array.prototype.pop.call(arguments); не рекомендует MDM
    for (i = 0; i < l; i++) {
        what.push(arguments[i]);
    }
    return contains(what, where);
}

// console.log('result = ', isInArray(1,2,3,4,5,[0,1,2,3,4,5,6,7,8,9]));
