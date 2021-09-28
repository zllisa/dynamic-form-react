import React, { useEffect, useState } from "react";
import './index.scss'
import Icon, { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { radioSvg } from "../../svg";
import { cloneDeep, cloneDeepWith } from "lodash";
import { createId, ItemType } from "../../../dynamic-form";



export interface QuestionRadioProps {
    id:string;
    state:ItemType[];
    number?: string;
    title?: string;
    required?: boolean;
    options?: RadioItemType[];
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    focus?:boolean;
    color?:string;
    onClick?: (key:string,state:any,e?:React.MouseEvent<HTMLElement>,)=>void
    onCopy?: (key:string,state:any,e?:React.MouseEvent<HTMLElement>,)=>void
    onDelete?: (key:string,state:any,e?:React.MouseEvent<HTMLElement>,)=>void
    onAdd?:() => void;

}
export interface RadioItemType {
    key: string
    value: string
    type?:string
}

const defaultRadioList: RadioItemType[] = [
    {
        value: '选项1',
        key: '选项一'
    },
    {
        value: '选项2',
        key: '选项二'
    },
    {
        value: '选项3',
        key: '选项三'
    }
]
const defaultTitle = '单选题';


const QuestionRadio: React.FC<QuestionRadioProps> = (props) => { 
    const [color,setColor] = useState<string>(props.color|| '#1890ff')
    const [title,setTitle] = useState<string>(props.title||defaultTitle)
    const [focus,setFocus] = useState<boolean>(props.focus!==undefined?props.focus:false)
    const [required,setRequired] = useState<boolean>(props.required!==undefined?props.required:false)
    const [options,setOptions] = useState<RadioItemType[]>(props.options || defaultRadioList)
    const RadioIcon = (props: any) => <Icon component={radioSvg} {...props} />

    useEffect(()=>{
        handleOnClick(props.id,props.state)
    },[])

    useEffect(()=>{
        if(props.options){
            setOptions(props.options)
        }
    },[props.options])

    useEffect(()=>{
        if(props.title){
            setTitle(props.title)
        }
    },[props.title])

    useEffect(()=>{
        if(props.focus!==undefined){
            setFocus(props.focus)
        }
    },[props.focus])

    useEffect(()=>{
        if(props.required!==undefined){
            setRequired(props.required)
        }
    },[props.required])


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
        <div 
        id={props.id}
        className={`question_radio ${props.className?props.className:''} ${focus?'focus':'unfocus'}`} 
        style={props.style}
        onClick={(e)=>{handleOnClick(props.id,props.state,e)}}
        >
            <div className="title">
                {
                    required&&
                    <span className="required"></span>
                }
                {props.number && <span>{`${props.number}. `}</span>}
                {title}
                <span className="tag">单选</span>
            </div>
            <div className="body">
            {
                options.length > 0&& options.map((item: RadioItemType) => {
                    return (
                        <div className="radioItem" key={item.key}>
                            <RadioIcon></RadioIcon>
                            <div>{item.value}</div>
                        </div>
                    )
                })
            }
            </div>
            {
                focus&&<span className="opreation">
                    <CopyOutlined onClick={(e)=>{handleOnCopy(props.id,props.state,e)}} style={{cursor:'pointer'}}/>
                    ｜
                    <DeleteOutlined onClick={(e)=>{handleOnDelete(props.id,props.state,e)}} style={{cursor:'pointer'}}/>
                </span>
            }
            
        </div>
    )
}
export default QuestionRadio