/**
 * Created by anton on 26.09.16.
 */

// Trainie

// 1 Задать такие b, для которых логические выражения будут возвращать значение, описанное в комментарии рядом (15 минут)

function booleans() {
    var b1 = true;
    console.log('b1 = ', true && b1, ' -> true'); // -> true
    var b2 = false;
    console.log('b2 = ', !'Hey there' || b2, ' -> false'); // -> false
    var b3 = false;
    console.log('b3 = ', 0 || !b3 && true, ' -> true'); // -> true
    var b4 = false;
    console.log('b4 = ', !10 && !(b4 || false), ' -> false'); // -> false
    var b5 = true; //любое
    console.log('b5 = ', !(null && undefined) && (![] || b5), ' -> true'); // -> true
    return;
}
