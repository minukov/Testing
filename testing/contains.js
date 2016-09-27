/**
 * Created by anton on 26.09.16.
 */

// PRE JUNIOR

//  1 Написать функцию contains. (время выполнения 15 - 45  минут)
//  Если элементы массива what содержатся в массиве where, функция должна
//  возвращать true иначе false. Пустой массив является подмножеством любого массива.

// порядок следования элементов в массивах не важен
// var where = ["red", "green", "blue", "white", "green", "blue", "red", "yellow"];
// var what = ["blue", "green", "yellow"];


function contains(what, where) {
    var wl = what.length;

    function check(element, index, array) {
        return (where.indexOf(element) !== -1);
    }

    if (wl === 0) {
        return true;
    }
    if (where.length < wl) {
        return false;
    }
    return what.every(check);
}

//console.log('result = ', contains(what,where));

