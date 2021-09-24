import { Input, Select, Switch } from "antd";
import { cloneDeep } from "lodash";
import React, { useState } from "react";
import { AttrType, ItemType } from "../../../App";
import './index.scss'
interface EditDatePickerProps {
    id: string;
    state: ItemType[];
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    tips?: string;
    title?: string;
    unit?: string;
    required?: boolean;
    onUpdate?: (arg: ItemType[]) => void
}

const EditDatePicker: React.FC<EditDatePickerProps> = (props) => {
    const { Option } = Select;
    const [title, setTitle] = useState<string>(props.title || '问答题')
    const [tips, setTips] = useState<string>(props.tips || '请输入数字')
    const [unit, setUnit] = useState<string>(props.unit || '')
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
    const handleTipsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTips(value)
        updateData('tips', value)
    }
    const handleDateTypeChange = (value: string) => {
        setUnit(value)
        updateData('unit', value)
    }
    const handleSwitchChange = (checked: boolean) => {
        setRequired(checked)
        updateData('required', checked)
    }
    return (
        <div
            className={`edit_number ${props.className ? props.className : ''}`}
            style={props.style}
        >

            <div className="title">问答题</div>
            <div className="body">
                <div className="type">
                    <span>题目</span>
                    <Input placeholder={title} value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleTitleChange(e) }} />
                </div>
                <div className="tips">
                    <span>提示文字</span>
                    <Input placeholder={tips} value={tips} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleTipsChange(e) }} />
                </div>
                <div className="dateType">
                    <span>日期类型</span>
                    <Select defaultValue="YYDDMM" style={{ width: 120 }} onSelect={handleDateTypeChange}>
                        <Option value="YYDDMM">年-月-日</Option>
                        <Option value="YYDDMMHHSS">年-月-日-时-分</Option></Select>
                </div>
                <div className="required">
                    <span>必填</span>
                    <Switch checked={required} onChange={handleSwitchChange} />
                </div>
            </div>
        </div>
    )
}
export default EditDatePicker

