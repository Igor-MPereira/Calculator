import CalcButton from "./CalcButton";

/**
 * retorna o fatorial de um numero
 * @param value numero a ser aplicado na operacao
 */
export function Factorial(value: number): number {
    let factorial = 1;
    for(let i = 1; i <= value; i++) {
        console.log(i)
        factorial *= i;
    }

    return factorial;
}

export function isCalcButton(obj: any): obj is CalcButton {
    return obj != undefined
        && obj != null;
}