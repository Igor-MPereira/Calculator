import CalcButton from "./CalcButton";
import { EButtonTypeEnum } from "./Enums/ButtonTypeEnum";

export default class Calculator {
    public static isCalcButton(obj: any): obj is CalcButton {
        return (
            obj != undefined
            && obj != null
        );
    }

    public static Factorial(value: number): number {
        let factorial = 1;
        for(let i = 1; i <= value; i++) {
            console.log(i)
            factorial *= i;
        }
    
        return factorial;        
    }

    /**
     * This Method is programmed to automatically do a complete arithmetic expression
     * considering the order of operators and parenthesis in the expression
     * @param expression the expression to execute it must have at least one operator and at least one number
     * @param remainingEx all the expressions on queue to be executed, they all must have a single ReplaceableType Button 
     */
    public static Evaluate(expression: Array<CalcButton>, ...remainingEx: Array<Array<CalcButton>>): string {
        let toEvaluate: Array<CalcButton>;
        let result: CalcButton = new CalcButton(EButtonTypeEnum.numero, '', '');
        let leftParenthesis = expression.FindIndex(cb => cb.Value === '(');
        let rightParenthesis = expression.FindIndex(cb => cb.Value === ')');
        const ReplaceableCB = new CalcButton(EButtonTypeEnum.replace, '*replace*', '*replace*');
        if(leftParenthesis > -1) {
            if(rightParenthesis > leftParenthesis) {
                toEvaluate = expression.splice(leftParenthesis, rightParenthesis - leftParenthesis + 1);
                expression.Insert(ReplaceableCB, leftParenthesis);
                toEvaluate.shift();
                toEvaluate.pop();
                return this.Evaluate(toEvaluate, expression, ...remainingEx);
            }

            toEvaluate = expression.splice(leftParenthesis);
            expression.Insert(ReplaceableCB, leftParenthesis);
            toEvaluate.shift();
            return this.Evaluate(toEvaluate, expression, ...remainingEx);
        }

        if(rightParenthesis > -1) {
            toEvaluate = expression.splice(0, rightParenthesis + 1);
            expression.Insert(ReplaceableCB, 0);
            toEvaluate.pop();
            return this.Evaluate(toEvaluate, expression, ...remainingEx);
        }

        let factorial = expression.FindIndex(cb => cb.Value === '!');
        if(factorial > -1) {
            toEvaluate = expression.splice(factorial - 1, 2);
            expression.Insert(ReplaceableCB, factorial -1);
            result = this.UnaryOperation(toEvaluate[0], toEvaluate[1]);
            expression.Update(result, (cb) => {
                expression.indexOf(cb) === (factorial - 1)
            });
            return this.Evaluate(expression, ...remainingEx);
        }

        let trigFunc = expression.FindIndex(cb => 
            cb.Value === 'sin'
            || cb.Value === 'cos'
            || cb.Value === 'tan'
        );
        if(trigFunc > -1) {
            toEvaluate = expression.splice(trigFunc - 1, 2);
            expression.Insert(ReplaceableCB, trigFunc);
            result = this.UnaryOperation(toEvaluate[0], toEvaluate[1]);
            expression.Update(result, (cb) => {
                expression.indexOf(cb) === (trigFunc - 1)
            });
            return this.Evaluate(expression, ...remainingEx);
        }

        return result.Value;
    }
    
    private static UnaryOperation(button: CalcButton, uOp: CalcButton): CalcButton {
        let number = Number(button.Value);
        const initValue = Number(button.Value);

        switch (uOp.Value) {
            case '!':
                number = Calculator.Factorial(initValue);
                if(initValue.toString().search('.') > -1) {
                    number = NaN;
                }
            break;
            case 'sin':
                number = Math.sin(initValue);
                if(initValue % Math.PI === 0) {
                    number = 0;
                }
            break;
            case 'cos':
                number = Math.cos(initValue);
                if(initValue % (Math.PI / 2) === 0 && initValue % Math.PI !== 0) {
                    number = 0;
                }
            break;
            case 'tan':
                number = Math.tan(initValue);
                if(initValue % Math.PI === 0) {
                    number = 0;
                } else if(initValue % (Math.PI / 2) === 0) {
                    number = Infinity;
                }
            break;
        }

        button.Value = number.toString();
        button.label = number.toString();

        return button;
    }

    private static BinaryOperation() {

    }

    public static ButtonValues: Array<CalcButton> = [
        new CalcButton(0, '1', '1'),
        new CalcButton(0, '2', '2'),
        new CalcButton(0, '3', '3'),
        new CalcButton(0, '4', '4'),
        new CalcButton(0, '5', '5'),
        new CalcButton(0, '6', '6'),
        new CalcButton(0, '7', '7'),
        new CalcButton(0, '8', '8'),
        new CalcButton(0, '9', '9'),
        new CalcButton(0, '0', '0'),
        new CalcButton(2, '+', '+'),
        new CalcButton(2, '-', '-'),
        new CalcButton(2, 'x', 'x'),
        new CalcButton(2, '/', '/'),
        new CalcButton(2, '^', '^'),
        new CalcButton(3, '=', '='),
        new CalcButton(1, '!', '!'),
        new CalcButton(1, 'sin(x)', 'sin'),
        new CalcButton(1, 'cos(x)', 'cos'),
        new CalcButton(1, 'tan(x)', 'tan'),
        new CalcButton(0, '.', '.'),
        new CalcButton(4, 'c', 'clear'),
        new CalcButton(0, 'π', `${Math.PI}`),
        new CalcButton(0, 'e', `${Math.E}`),
    ];
    
    public static StringButtonValues: Array<string> = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '+',
        '-',
        'x',
        '/',
        '^',
        '=',
        '!',
        'sin(x)',
        'cos(x)',
        'tan(x)',
        '.',
        'c',
        'π',
        'e'
    ];
}