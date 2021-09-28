import React from 'react';
import { AttrType, FuncsType } from './dynamic-form';
import { QuestionRadioProps } from './components/radio/question';


interface CustomComponentProps {
    component: React.ComponentClass<any, any> | React.FC<any>;
    id: string; 
    attrs?:AttrType
    funcs?:FuncsType
    state?:any
}
const CustomComponent: React.FC<CustomComponentProps> = ({
    component: Component,
    id,
    attrs,
    funcs,
    ...props
}) => {
    
    return <Component id={id} {...attrs} {...funcs} {...props} />
}
export default CustomComponent


