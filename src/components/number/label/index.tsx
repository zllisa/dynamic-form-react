import Icon from "@ant-design/icons";
import React from "react";
import { numberSvg } from "../../svg";

interface LabelNumberProps{
    id?:string;
    name?:string;
}


const LabelNumber: React.FC<LabelNumberProps> = (props) => {
    const NumberIcon = (props: any) => <Icon component={numberSvg} {...props} />
    return (
        <div style={{padding:'10px 0'}}>
            <div style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
                <NumberIcon></NumberIcon>
                <span style={{padding:'0 10px'}}>数字题</span>
            </div>
        </div>
    )
}
export default LabelNumber