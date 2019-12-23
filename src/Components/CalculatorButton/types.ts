import CalcButton from "../../Helpers/CalcButton";
import { EDifficultyLevelEnum } from "../../Helpers/Enums/DifficultyLevelEnum";

export interface CalculatorButtonProps {
    buttonValue?: CalcButton;
    stringButtonValue?: string;
    handleClickButton(value: string): void;
    calcLvl: EDifficultyLevelEnum;
}