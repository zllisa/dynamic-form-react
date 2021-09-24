import Icon from "@ant-design/icons";
import React from "react";
import { answerSvg } from "../../svg";

interface LabelAnswerProps{
    id?:string;
    name?:string;
}


const LabelAnswer: React.FC<LabelAnswerProps> = (props) => {
    const AnswerIcon = (props: any) => <Icon component={answerSvg} {...props} />
    return (
        <div style={{padding:'10px 0'}}>
            <div style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
                <AnswerIcon></AnswerIcon>
                <span style={{padding:'0 10px'}}>问答题</span>
            </div>
        </div>
    )
}
export default LabelAnswer