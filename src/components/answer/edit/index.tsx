import Icon from "@ant-design/icons";
import { Input, Switch } from "antd";
import { cloneDeep } from "lodash";
import React, { useState } from "react";
import { AttrType, ItemType } from "../../../App";
import './index.scss'
interface EditAnswerProps {
    id: string;
    state: ItemType[];
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    tips?: string;
    title?: string;
    required?: boolean;
    onUpdate?: (arg: ItemType[]) => void
}

const EditAnswer: React.FC<EditAnswerProps> = (props) => {
    const [title, setTitle] = useState<string>(props.title || '问答题')
    const [required, setRequired] = useState<boolean>(props.required !== undefined ? props.required : false)

    const updateData = (key: keyof AttrType, newValue: any) => {
        const { onUpdate, state, id } = props
        const stateCopy = cloneDeep(state);
        stateCopy?.map((item) => {
            if (item.id === id) {
                item.attrs[key] = newValue
            }
        })
        onUpdate?.(stateCopy)
    }
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value)
        updateData('title', value)
    }
    const handleSwitchChange = (checked: boolean) => {
        setRequired(checked)
        updateData('required',checked)
    }
    return (
        <div
            className={`edit_answer ${props.className ? props.className : ''}`}
            style={props.style}
        >

            <div className="title">问答题</div>
            <div className="body">
                <div className="type">
                    <span>题目</span>
                    <Input placeholder={title} value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleTitleChange(e) }} />
                </div>
                <div className="required">
                        <span>必填</span>
                        <Switch checked={required} onChange={handleSwitchChange} />
                    </div>
            </div>
        </div>
    )
}
export default EditAnswer

