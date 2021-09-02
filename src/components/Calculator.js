import React, {useState} from 'react'
import { numbers } from './numbers'
import { operators } from './operators'
import './Calculator.css';

function Calculator() {
    const [currentVal, setCurrentVal] = useState(() => {return '0'})
    const [formula, setFormula] = useState(() => {return '0'})
    const [decimalFlag, setDecimalFlag] = useState(() => {return false})

    const handleNumbers = (e) => {
        const value = e.target.value
        if (formula === '0') {
            setFormula(value)
            setCurrentVal(value)
        }
        else {
            setFormula(prevFormula => prevFormula + value)
            setCurrentVal(value)
        }
    }

    const handleClear = () => {
        setCurrentVal('0')
        setFormula('0')
        setDecimalFlag(false)
    }

    const handleDecimal = (e) => { 
        const value = e.target.value

        if (decimalFlag === false) {

            setFormula(prevFormula => (!/\d$/.test(formula))
            ? prevFormula + '0' + value
            : prevFormula + value
            )

            setCurrentVal(value)
            setDecimalFlag(true)

        }

        else {
            setFormula(prevFormula => prevFormula.replace('.', value))
            setCurrentVal(value)
        }

    }

    const handleOperators = (e) => {
        const value = e.target.value
        const operatorRegex = /[x/+-]$/
        const negativeRegex = /([x/+])-$/
        

        if (!operatorRegex.test(formula)) {
            setFormula(prevFormula => prevFormula + value)
        }

        else if (operatorRegex.test(formula)) {
            setFormula(prevFormula => (negativeRegex.test(formula)
            ? prevFormula.replace(negativeRegex, value)
            : prevFormula.replace(currentVal, value)))
        }

        setCurrentVal(value)
        setDecimalFlag(false)

    }

    const handleNegativeSign = (e) => {
        const value = e.target.value
        const operatorRegex = /[x/+-]$/
        const negativeRegex = /([x/+])-$/
        
        if (!operatorRegex.test(formula)) {
            setFormula((prevFormula => prevFormula + value))
            setCurrentVal(value)
        }

        else if (operatorRegex.test(formula)) {
            setFormula(prevFormula => (negativeRegex.test(formula + value)
            ? prevFormula + value
            : prevFormula.replace(currentVal, value)))
        }

        setCurrentVal(value)
        setDecimalFlag(false)

    }

    const handleEvaluate = () => {
        const operatorRegex = /[x/+-.]$/
        let expression = formula
        
        if (operatorRegex.test(expression)) {
            expression = expression.slice(0, -1)
        }

        const evalRegex = /(-)?(\d+[.])?(\d+)([x+/-])(-)?(\d+)([.]\d+)?/

        while (evalRegex.test(expression)) {
            let operation = expression.match(evalRegex)[0]
            let firstNumber = 0
            let secondNumber = 0
            let answer = 0
            console.log(operation)
            console.log(formula)
            console.log(expression)

            if (/(-)?(\d+[.])?(\d+)([x+/-])(-)(\d+)([.]\d+)?/.test(operation)) {

                if (operation.includes('+')) {
                    firstNumber = operation.slice(0, operation.indexOf('+'))
                    secondNumber = operation.slice(operation.indexOf('-') + 1)
                    answer = ((1000000000000 * firstNumber) - (1000000000000 * secondNumber)) / 1000000000000
                }
                else if (operation.includes('x')) {
                    firstNumber = operation.slice(0, operation.indexOf('x'))
                    secondNumber = operation.slice(operation.indexOf('x') + 1)
                    answer = ((1000000000000 * firstNumber) / 1000000000000)  * ((1000000000000 * secondNumber) / 1000000000000)
                }
                else if (operation.includes('/')) {
                    firstNumber = operation.slice(0, operation.indexOf('/'))
                    secondNumber = operation.slice(operation.indexOf('/') + 1)
                    answer = (1000000000000 * firstNumber) / (1000000000000 * secondNumber)
                }
            }

            if (/(-)?(\d+[.])?(\d+)([x+/-])(\d+)([.]\d+)?/.test(operation)) {

                if (operation.includes('+')) {
                    firstNumber = operation.slice(0, operation.indexOf('+'))
                    secondNumber = operation.slice(operation.indexOf('+') + 1)
                    answer = ((1000000000000 * firstNumber) + (1000000000000 * secondNumber)) / 1000000000000
                }

                else if (operation.includes('-')) {
                    firstNumber = operation.slice(0, operation.indexOf('-'))
                    secondNumber = operation.slice(operation.indexOf('-') + 1)
                    answer = ((1000000000000 * firstNumber) - (1000000000000 * secondNumber)) / 1000000000000
                }
    
                else if (operation.includes('x')) {
                    firstNumber = operation.slice(0, operation.indexOf('x'))
                    secondNumber = operation.slice(operation.indexOf('x') + 1)
                    answer = ((1000000000000 * firstNumber) / 1000000000000)  * ((1000000000000 * secondNumber) / 1000000000000)
                }
    
                else if (operation.includes('/')) {
                    firstNumber = operation.slice(0, operation.indexOf('/'))
                    secondNumber = operation.slice(operation.indexOf('/') + 1)
                    answer = (1000000000000 * firstNumber) / (1000000000000 * secondNumber)
                }

            }

            answer = answer.toString()
            expression = expression.replace(evalRegex, answer)
        }

        setCurrentVal(expression)
        setFormula(expression)
        setDecimalFlag(prevFlag => (/[.]/g.test(formula)
        ? prevFlag = true
        : prevFlag = false))

        /* const answer = Math.round(1000000000000 * 
            eval(expression.replace(/x/g, '*'))) / 1000000000000; */
        
        /* setFormula(answer.toString())
        setCurrentVal(answer.toString())
        setDecimalFlag(false) */

    }

    return (
        <div id='calculator'>
            <div id='screen'>
                <div id='display'>{formula}</div>
                <div id='currentValue'>{currentVal}</div>
            </div>
            <div id='buttons'>
                 <button id='clear' value='CE' onClick={handleClear}>CE</button>
                 {operators.map((x) => (
                <button id={x[0]} key={x[0]} value={x[1]} onClick={handleOperators}>{x[1]}</button>
                ))}
                <button id='subtract' value='-' onClick={handleNegativeSign}>-</button>
                {numbers.map((x) => (
                <button id={x[0]} key={x[0]} value={x[1]} onClick={handleNumbers}>{x[1]}</button>
                ))}
                <button id='decimal' value='.' onClick={handleDecimal}>.</button>
                <button id='equals' value='=' onClick={handleEvaluate}>=</button>
            </div>
        </div>
    )
}

export default Calculator
