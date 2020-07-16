import * as React from 'react';

import './text-input.css';

// TODO: I should omit the 'type' attribute, but that is Typescript insanity.
type TextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Button: React.FunctionComponent<TextInputProps> =
(props: TextInputProps) => {
    const { className } = props;

    let inputClassName = "default-input";
    if (className) {
        inputClassName += ` ${className}`;
    }
    
    return (
        <input {...props} className={inputClassName} type={props.type || "text"}></input>
    );
};

export default Button;