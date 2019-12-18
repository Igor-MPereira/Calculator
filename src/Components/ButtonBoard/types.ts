import CalcButton from "../../Helpers/CalcButton";

export interface ButtonBoardProps {
    buttonValues: Array<CalcButton>;
    handleClickButton(value: string): void; 
}