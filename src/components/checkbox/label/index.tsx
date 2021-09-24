import Icon from "@ant-design/icons";
import React from "react";
import { selectedCheckBoxSvg } from "../../svg";

interface LabelCheckBoxProps{
    id?:string;
    name?:string;
}


const LabelCheckBox: React.FC<LabelCheckBoxProps> = (props) => {
    const SelectedCheckBoxIcon = (props: any) => <Icon component={selectedCheckBoxSvg} {...props} />
    return (
        <div style={{padding:'10px 0'}}>
            <div style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
                <SelectedCheckBoxIcon></SelectedCheckBoxIcon>
                <span style={{padding:'0 10px'}}>多选题</span>
            </div>
        </div>
    )
}
export default LabelCheckBox

