import React from 'react';


interface CustomFromComponentProps {
    component: React.ComponentClass<any, any> | React.FC<any>;

}
const CustomFromComponent: React.FC<CustomFromComponentProps> = ({
    component: Component,
    ...props
}) => {
    
    return <Component {...props} />
}
export default CustomFromComponent


