import React, { useEffect, useState } from "react";
import { Input } from 'antd';
import './index.scss'
import { CalendarOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { createId, ItemType } from "../../../App";
import { cloneDeep } from "lodash";

const { TextArea } = Input;

export interface QuestionDatePickerProps {
    id:string;
    state:ItemType[],
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    focus?: boolean;
    number?: string;
    title?: string;
    required?: boolean;
    tips?: string;
    onClick?: (key:string,state:any,e?:React.MouseEvent<HTMLElement>,)=>void;
    onCopy?: (key:string,state:any,e?:React.MouseEvent<HTMLElement>,)=>void;
    onDelete?: (key:string,state:any,e?:React.MouseEvent<HTMLElement>,)=>void;
}

const QuestionDatePicker: React.FC<QuestionDatePickerProps> = (props) => {
    const [title, setTitle] = useState<string>(props.title || '日期')
    const [tips, setTips] = useState<string>(props.tips || '请选择日期')
    const [focus, setFocus] = useState<boolean>(props.focus!==undefined?props.focus:false)
    const [required, setRequired] = useState<boolean>(props.required!==undefined?props.required:false)

    useEffect(() => {
        if (props.title) {
            setTitle(props.title)
        }
    }, [props.title])

    useEffect(() => {
        if (props.focus!==undefined) {
            setFocus(props.focus)
        }
    }, [props.focus])

    useEffect(() => {
        if (props.required!==undefined) {
            setRequired(props.required)
        }
    }, [props.required])

    useEffect(() => {
        if (props.tips) {
            setTips(props.tips)
        }
    }, [props.tips])

    useEffect(() => {
       handleOnClick(props.id,props.state)
    }, [])

    const handleOnClick= (key:string,state:ItemType[],e?: React.MouseEvent<HTMLDivElement>)=>{
        const {onClick} = props
        if (typeof onClick === 'function') {
            const copyState = cloneDeep(state);
            copyState.map((item:any)=>{
                if (item.attrs) {
                    item.attrs.focus = false
                    if(item.id === key){
                        item.attrs.focus = true
                    }
                }
                
            })
            onClick(key,copyState);
          }
    }
    const handleOnCopy = (key:string,state:ItemType[],e: React.MouseEvent<HTMLElement>)=>{
        const {onCopy} = props
        e.stopPropagation()
        const copyState = cloneDeep(state);
        const [currentItem] = copyState.filter((item)=>item.id ===key)
        currentItem.id =createId()
        const copyState2 = cloneDeep(state);
        copyState2.push(currentItem)
        onCopy?.(key,copyState2,e)
    }
    const handleOnDelete = (key:string,state:ItemType[],e: React.MouseEvent<HTMLElement>)=>{
        const {onDelete} = props
        e.stopPropagation()
        const copyState = cloneDeep(state);
        const [currentItem] = copyState.filter((item)=>item.id ===key)
        copyState.splice(copyState.indexOf(currentItem),1)
        onDelete?.(key,copyState,e)
        if(copyState.length>0){
            handleOnClick(copyState[copyState.length-1].id,copyState)
        }
    }

    return (
        <div className={`question_datepicker ${props.className ? props.className : ''} ${focus ? 'focus' : 'unfocus'}`}
            style={props.style}
            onClick={(e)=>{handleOnClick(props.id,props.state,e)}}
        >

            <div className="title">
                {
                    required &&
                    <span className="required"></span>
                }
                {props.number && <span>{`${props.number}. `}</span>}
                {title}
            </div>

            <div className="body">
                <Input
                    placeholder={tips}
                    readOnly
                    type='number'
                    suffix={<CalendarOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                />
            </div>
            {
                focus && <span className="opreation">
                    <CopyOutlined onClick={(e)=>{handleOnCopy(props.id,props.state,e)}} style={{ cursor: 'pointer' }} />
                    ｜
                    <DeleteOutlined onClick={(e)=>{handleOnDelete(props.id,props.state,e)}} style={{ cursor: 'pointer' }} />
                </span>
            }
        </div>
    )
}

export default QuestionDatePicker;