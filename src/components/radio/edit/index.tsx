import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Switch } from "antd";
import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { AttrType, ItemType } from "../../../App";
import './index.scss';

interface EditRadioProps {
    id:string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    options?: any[];
    title?:string;
    state:ItemType[];
    required?:boolean;
    onRelated?: React.MouseEventHandler<HTMLButtonElement>;
    onUpdate?:(arg:ItemType[])=>void
}

const EditRadio: React.FC<EditRadioProps> = (props) => {
    const [optionItems, setOptionItems] = useState<any[]>(props.options || [
        { key: '1', value: '选项1', type: 'n' },
        { key: '2', value: '选项2', type: 'n' },
        { key: '3', value: '选项3', type: 'n' },
    ])
    const [title,setTitle] = useState<string>(props.title||'单选题')
    const [required,setRequired] = useState<boolean>(props.required!==undefined?props.required:false)
    const [hasRelatedOption, setHasRelatedOption] = useState<boolean>(false)
    const [hasOtherItem, setHasOtherItem] = useState<boolean>(false)


    const handleSwitchChange = (checked: boolean) => {
        setRequired(checked)
        updateData('required',checked)
    }

    const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setTitle(value)
        updateData('title',value)
    }

    const handleCurrentInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        
        const value = e.target.value
        const copyOptions = cloneDeep(optionItems);
        copyOptions.forEach((item:any)=>{
            if(item.key === key){
                item.value = value
            }
        })
        setOptionItems(copyOptions)
        updateData('options',copyOptions)
    }

    const updateData=(key:keyof AttrType  ,newValue:any)=>{
        const {onUpdate,state,id} = props
        const stateCopy = cloneDeep(state);
        stateCopy?.map((item)=>{
            if(item.id === id){
                item.attrs[key] = newValue
            }
        })
        onUpdate?.(stateCopy)
    }
    const addOption = () => {
        //shouldnt use index, use last item key
        const optionItemsCopy = cloneDeep(optionItems);
        let lastItemKey;
        let newOptions = [];
        if (optionItems[optionItems.length - 1].type === 'o') {
            optionItemsCopy[optionItems.length - 1].key = String(optionItems.length + 1)
            lastItemKey = Number(optionItems[optionItems.length - 1].key)
            const otherItem = optionItemsCopy.splice(optionItemsCopy.length - 1, 1)
            newOptions = [...optionItemsCopy, { key: `${lastItemKey}`, value: `选项${lastItemKey}` }, ...otherItem]
        } else {
            lastItemKey = Number(optionItems[optionItems.length - 1].key) + 1
            newOptions = [...optionItemsCopy, { key: `${lastItemKey}`, value: `选项${lastItemKey}` }]
        }

        setOptionItems(newOptions)
        updateData('options',newOptions)
    }
    const addOtherOption = () => {
        const lastItemKey = Number(optionItems[optionItems.length - 1].key)
        const newOptions = [...optionItems, { key: `${lastItemKey + 1}`, value: `其他项`, type: 'o' }]
        setOptionItems(newOptions)
        setHasOtherItem(true)
        updateData('options',newOptions)
    }

    const deleteCurrentItem = (key: string) => {
        let targetIndex: number = -1;
        if(optionItems.length<2){
            return false
        }
        optionItems.forEach((item: any, index: number) => {
            if (item.key === key) {
                targetIndex = index
                if (item.type === 'o') {
                    setHasOtherItem(false)
                }
            }
        })
        const copyOptions = cloneDeep(optionItems)
        if (targetIndex !== -1) {
            copyOptions.splice(targetIndex, 1)
            setOptionItems(copyOptions)
            updateData('options',copyOptions)
        } else {
            return false
        }

    }

    const onRelatedOption = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        props.onRelated?.(e)
    }

    return (
        <div
            className={`edit_radio ${props.className ? props.className : ''}`}
            style={props.style}
        >
            <div className="title">单选</div>
            <div className="body">
                <div className="type">
                    <span>题目</span>
                    <Input placeholder={title} value={title} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleTitleChange(e)}} />
                </div>
                <div className="options">
                    <div>选项</div>
                    {
                        optionItems.length > 0 && optionItems.map((item) => {
                            return (
                                <div className="options_item" key={item.key}>
                                    <Input className="options_item_input" placeholder={item.value} value={item.value} disabled={item.type === 'o' ? true : false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCurrentInputChange(e, item.key) }} />
                                    <DeleteOutlined onClick={() => {
                                        deleteCurrentItem(item.key)
                                    }} style={{ cursor: 'pointer' }} />
                                </div>
                            )
                        })
                    }
                    <div className="other_cfg">
                        <Button className="cfg_btn" type="link" onClick={addOption}>添加选项</Button>
                        <Button className="cfg_btn" type="link" onClick={addOtherOption} disabled={hasOtherItem}>添加其他项</Button>
                        <Button className="cfg_btn" type="link" onClick={onRelatedOption}>关联选项{hasRelatedOption ? '已设置' : ''}</Button>
                    </div>
                    <div className="required">
                        <span>必填</span>
                        <Switch checked={required} onChange={handleSwitchChange} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditRadio