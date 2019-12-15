//Apenas Funções De Ajuda
//Não É necessário Entender Para Compreender O Código Da Calculadora

/**
 * função que seleciona dois numeros e retorna o resultado de uma potência dos numeros
 * @param base numero da base
 * @param exp numero do expoente
 */
export function toIntPower(base: number, exp: number): number {
    let result = base;
    if(exp == 0) {
        result = 1;
    } else if(exp < 0) {
        for(let i = 1; i < exp; i++) {
            result = result * base;
        }
        result = 1 / result;
    }
    else {
        for(let i = 1; i < exp; i++) {
            result = result * base;
        }
    }

    return result;
}

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

const PI = 3.1415926;

/**
 * funcao trigonometrica SENO
 * @param x angulo a ser aplicado no seno
 * @param mode modo a ser aplicado o angulo, radianos (rad) ou graus (°)
 */
export function Sin(x: number, mode: 'RAD' | 'DEG'): number {
    const constantMultiple = mode === 'RAD' ? 1 : (PI / 180);
    const angle = x * constantMultiple;
    let sen: number = 0;

    for(let i = 1; i < 50; i++) {
        sen += (i % 2 === 0 ? -1 : 1) * toIntPower(angle, ((2 * i) - 1))/Factorial(((2 * i) - 1));
    }

    if(mode === 'DEG') {
        sen = (x % 180 === 0) ? 0 : sen;
    } else if (mode === 'RAD') {

    }

    return Number(sen.toFixed(10));
}

/**
 * funcao triganometrica COSSENO
 * @param x angulo a ser aplicado no cosseno
 * @param mode modo a ser aplicado o angulo, radiano (rad) ou graus (°)
 */
export function Cos(x: number, mode: 'RAD' | 'DEG'): number {
    const constantMultiple = mode === 'RAD' ? 1 : (PI / 180);
    const angle = x * constantMultiple;
    let cos: number = 0;

    for(let i = 0; i < 50; i++) {
        cos += (i % 2 == 0 ? 1 : -1) * toIntPower(angle, 2 * i)/Factorial(2 * i);
    }

    if(mode === 'DEG') {
        cos = (x % 90 !== 0) ? cos : (x % 180 === 0 ? cos : 0);
    }

    return Number(cos.toFixed(10));
}

/**
 * funcao trigonometrica TANGENTE
 * @param x angulo a ser aplicado no cosseno
 * @param mode modo a ser aplicado no angulo, radiano (rad) ou graus(°)
 */
export function Tan(x: number, mode: 'RAD' | 'DEG'): number {
    let tan: number = 0;

    tan = Sin(x, mode)/Cos(x, mode);

    return tan;
}