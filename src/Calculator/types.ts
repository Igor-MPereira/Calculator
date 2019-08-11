export interface CalculatorProps {
}

export interface CalculatorState {
    value1: string | null;
    value2: string | null;
    operator: string | null;
    prevOperator: string | null;
    memValue: string | null;
    displayResult: string | null;
    displayEquation: string;
    isEqual: boolean;
}