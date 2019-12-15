export interface CalculatorProps {
    
}

export interface CalculatorState {
    number1: string | null; // string do primeiro numero
    number2: string | null; // string do segundo numero
    operator: string | null; // string do operador
    displayEq: string; // string com a equaçao
    displayResult: string | null; //string com o resultado
}