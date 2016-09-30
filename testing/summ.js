/**
 * Created by anton on 26.09.16.
 */

// PRE JUNIOR

// 10 Создай функцию с именем summ, (время выполнения 15 -45 минут)
//  которая возвращает сумму всех передаваемых ей аргументов.
//  Функция должна отрабатывать с любыми входящими данными.
//  Функция должна всегда возвращать число.

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function summ() {
    var i, l = arguments.length,
        arg, result = 0;

    for (i = 0; i < l; i++) {
        arg = arguments[i];
        if (!(isNumeric(arg))) {
            continue;
        }
        result += Number(arg);
    }
    return result;
}

// console.log('result = ', summ (1,2,3,[4,5,6],{a:7,b:8},'9.5','-9,89','str',false));