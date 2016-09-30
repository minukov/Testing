/**
 * Created by anton on 26.09.16.
 */

// PRE JUNIOR

// 14 Написать функцию createKeeper(), (время выполнения 15-45 минут)
//  которая возвращает объект с 2 методами put(key, value) и get(key).
//  Метод get(key) должен возвращать данные, которые были сохранены с помощью метода put,
//  если вызывается с тем-же значением key, что и put.
//  Ключами могут быть как объекты, так и примитивы, про NaN не задумываться.
//  Если put был вызван с таким ключом, с которым уже был вызван ранее, старое значение перезатирается новым.
//  Доступ к ключам и значениями должен быть возможен только через методы put и get.

function createKeeper() {
    var keeper = {};
    return {
        put: function(key,value) {
            keeper[key] = value;
        },
        get: function(key) {
            return keeper[key];
        }
    };
}

// var keep1 = createKeeper();
// var keep2 = createKeeper();
// keep1.put(1,1);
// keep1.put(1,3);
// keep2.put([2],{a:'b'});
// console.log('keep1 = ',keep1.get(1));
// console.log('keep2 = ',keep2.get([2]));

