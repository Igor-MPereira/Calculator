import CalcButton from "../../Helpers/CalcButton";

export interface CalculatorButtonProps {
    buttonValue: CalcButton;
    handleClickButton(value: string): void;
}