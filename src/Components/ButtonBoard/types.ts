import CalcButton from "../../Helpers/CalcButton";
import { EDifficultyLevelEnum } from "../../Helpers/Enums/DifficultyLevelEnum";

export interface ButtonBoardProps {
    buttonValues?: Array<CalcButton>;
    stringButtonValues?: Array<string>;
    handleClickButton?(value: CalcButton): void; 
    handleClickButtonString?(value: string): void;
    calcLvl: EDifficultyLevelEnum;
}