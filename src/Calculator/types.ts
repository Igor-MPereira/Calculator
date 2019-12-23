import CalcButton from "../Helpers/CalcButton";

export interface CalculatorProps {
    
}

export interface CalculatorState {
    number1: CalcButton | null; // primeiro numero
    number2: CalcButton | null; // segundo numero
    binaryOperator: CalcButton | null; // operador binário
    unaryOperator: CalcButton | null; // operador unário
    displayEq: string; // string com a equaçao
    displayResult: string | null; //string com o resultado
}