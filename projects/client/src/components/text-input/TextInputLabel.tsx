import * as React from 'react';

import './text-input.css';

// TODO: I should omit the 'type' attribute, but that is Typescript insanity.
type TextInputLabelProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

const Button: React.FunctionComponent<React.PropsWithChildren<TextInputLabelProps>> =
(props: React.PropsWithChildren<TextInputLabelProps>) => {
    const { className, children } = props;

    let inputClassName = "default-input-label";
    if (className) {
        inputClassName += ` ${inputClassName}`;
    }
    
    return (
        <label {...props} className={inputClassName}>{children}</label>
    );
};

export default Button;