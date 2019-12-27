import { EButtonTypeEnum } from "./Enums/ButtonTypeEnum";

export default class CalcButton {
    public ValueType: EButtonTypeEnum;

    public Value: string;

    public label: string;

    public isOperator: boolean;

    constructor(valueType: EButtonTypeEnum, label: string, value: string) {
        this.ValueType = valueType;
        this.Value = value;
        this.label = label;
        this.isOperator = valueType === 1 || valueType === 2;
    }
}