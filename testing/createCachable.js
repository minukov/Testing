/**
 * Created by anton on 26.09.16.
 */

// PRE JUNIOR

// 13 Написать функцию createCachable(func), (время выполнения 15- 45 минут)
//  принимающую аргументом функцию. createCachable(func) возвращает новую функцию,
//  которая возвращает результат вызова func и запоминает его,
//  или возвращает уже запомненный результат для текущего аргумента.
//  Функция func может иметь только один аргумент.
//  createCachable(func) может создавать какое угодно количество кешированных версий функций.

function createCachable(func) {
    var cache = {};
    return function (arg) {
        if (!arg || !arg.name) {
            return;
        }
        var key = arg.name;
        if (!(key in cache)) {
            cache[key] = arg();
        }
        return cache[key];
    }
}

//
// function test(arg) {
//     console.log('arg = ', arg);
//     return arg;
// }
//
// function test(arg) {
//     console.log('arg = ', arg);
//     return arg + 1;
// }
//
// console.log('createCachable = ', createCachable(test, 1));
// console.log('createCachable = ', createCachable(test, 2));
// console.log('createCachable = ', createCachable(test, 2));
// console.log('createCachable = ', createCachable(test, '2'));

