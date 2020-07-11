import * as React from 'react';

import './button.css';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button: React.FunctionComponent<React.PropsWithChildren<ButtonProps>> =
(props: React.PropsWithChildren<ButtonProps>) => {
    const { children, className, ...newProps } = props;

    let buttonClassName = "default-button";
    if (className) {
        buttonClassName += ` ${className}`;
    }

    return (
        <button {...newProps} className={buttonClassName}>{children}</button>
    );
};

export default Button;