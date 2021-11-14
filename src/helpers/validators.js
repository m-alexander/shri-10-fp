/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
    all,
    allPass,
    propEq,
    filter,
    compose,
    equals,
    length,
    lte,
    keys,
    converge,
    apply,
    values,
    omit,
    countBy,
    trim,
    prop,
    complement
} from "ramda";

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    propEq('triangle', 'white'),
    propEq('circle', 'white'),
    propEq('star', 'red'),
    propEq('square', 'green')
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
    lte(2),
    length,
    keys,
    filter(equals('green'))
);

// 3. Количество красных фигур равно кол-ву синих.
const countShapesByColor = color => compose(
    length,
    keys,
    filter(equals(color))
)
export const validateFieldN3 = converge(
    equals,
    [countShapesByColor('blue'), countShapesByColor('red')]
);

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([
    propEq('circle', 'blue'),
    propEq('star', 'red'),
    propEq('square', 'orange')
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(
    lte(3),
    apply(Math.max),
    values,
    omit(['white']),
    countBy(trim),
    values
);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
const isTriangleGreen = propEq('triangle', 'green')
const colorsCount = compose(countBy(trim), values)
const greens2AndRed1 = compose(
    allPass([propEq('green', 2), propEq('red', 1)]),
    colorsCount
)
export const validateFieldN6 = allPass([
    isTriangleGreen,
    greens2AndRed1
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(
    all(equals('orange')),
    values
);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = allPass([
    complement(propEq('star', 'white')),
    complement(propEq('star', 'red'))
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(
    all(equals('green')),
    values
);

// 10. Треугольник и квадрат одного цвета (не белого)
const isTriangleNotWhite = complement(propEq('triangle', 'white'))
const colorsAreEquals = converge(equals, [prop('triangle'), prop('square')])
export const validateFieldN10 = allPass([
    isTriangleNotWhite,
    colorsAreEquals
]);
