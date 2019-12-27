import CalcButton from "../Helpers/CalcButton";

export interface ICalculatorMediumState {
    number1: CalcButton | null; 
    number2: CalcButton | null; 
    binaryOperator: CalcButton | null; 
    unaryOperator: CalcButton | null; 
    displayEq: string; 
    displayResult: string | null; 
}

export interface ICalculatorEasyState {
    number1: string | null;
    number2: string | null;
    operator: string | null;
    displayEq: string;
    displayResult: string | null;
}

export interface ICalculatorHardState {
    Expression: Array<CalcButton> | null;
    displayEx: string;
    displayResult: string | null;
    isResult: boolean;
}