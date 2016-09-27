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

function createCachable(func, arg) {
    var cache = {},
        key = typeof arg + '|' + arg + '|' + func.name;
    if (!cache[key]) {
        cache[key] = func(arg);
    }
    return cache[key];
}

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

