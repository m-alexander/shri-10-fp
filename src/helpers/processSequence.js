/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import {andThen, ifElse, length, otherwise, pipe, prop, tap, test} from "ramda";

const api = new Api();


const processSequence = ({value, writeLog, handleSuccess, handleError}) => {

    const validationError = handleError('ValidationError')
    const convertNumber = number => api.get('https://api.tech/numbers/base', {from: 10, to: 2, number})
    const getAnimal = number => api.get(`https://animals.tech/${number}`, {})

    const square = x => x * x
    const modulo3 = x => x % 3

    const processConvertedNumber = pipe(
        prop('result'),
        tap(writeLog),
        String,
        length,
        tap(writeLog),
        square,
        tap(writeLog),
        modulo3,
        tap(writeLog),
        getAnimal,
        andThen(pipe(
            prop('result'),
            handleSuccess
        )),
        otherwise(handleError),
    )

    const processNumber = pipe(
        Math.round,
        tap(writeLog),
        convertNumber,
        andThen(processConvertedNumber),
        otherwise(handleError),
    )


    const app = pipe(
        tap(writeLog),
        ifElse(
            test(/^[0-9\.]{3,9}$/),
            processNumber,
            validationError
        ),
    )

    return app(value)
}

export default processSequence;
