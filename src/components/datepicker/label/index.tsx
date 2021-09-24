import Icon from "@ant-design/icons";
import React from "react";
import { datePickerSvg } from "../../svg";

interface LabelDatePickerProps{
    id?:string;
    name?:string;
}


const LabelDatePicker: React.FC<LabelDatePickerProps> = (props) => {
    const DatePickerIcon = (props: any) => <Icon component={datePickerSvg} {...props} />
    return (
        <div style={{padding:'10px 0'}}>
            <div style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
                <DatePickerIcon></DatePickerIcon>
                <span style={{padding:'0 10px'}}>日期题</span>
            </div>
        </div>
    )
}
export default LabelDatePicker