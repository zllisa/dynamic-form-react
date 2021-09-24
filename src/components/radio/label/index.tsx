import Icon from "@ant-design/icons";
import React from "react";
import { selectedRadioSvg } from "../../svg";

interface LabelRadioProps{
    id?:string;
    name?:string;
}


const LabelRadio: React.FC<LabelRadioProps> = (props) => {
    const SelectedRadioIcon = (props: any) => <Icon component={selectedRadioSvg} {...props} />
    return (
        <div style={{padding:'10px 0'}}>
            <div style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
                <SelectedRadioIcon></SelectedRadioIcon>
                <span style={{padding:'0 10px'}}>单选题</span>
            </div>
        </div>
    )
}
export default LabelRadio