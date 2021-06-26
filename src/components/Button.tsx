import {ButtonHTMLAttributes} from 'react'
import "../styles/button.scss"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
    dark?: boolean
}; 

const Button = ({ 
    isOutlined = false,
    dark= false,
     ...props 
    }: ButtonProps) => 
{
    return (    
      <button 
        className={`button${isOutlined ? ' outlined' : ' '}${dark ? ' dark' : ' '}`}
        {...props}
      />
    );
}

export default Button;