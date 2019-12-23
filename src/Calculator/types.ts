import CalcButton from "../Helpers/CalcButton";

export interface CalculatorMediumState {
    number1: CalcButton | null; 
    number2: CalcButton | null; 
    binaryOperator: CalcButton | null; 
    unaryOperator: CalcButton | null; 
    displayEq: string; 
    displayResult: string | null; 
}

export interface CalculatorEasyState {
    number1: string | null;
    number2: string | null;
    operator: string | null;
    displayEq: string;
    displayResult: string | null;
}