import * as React from 'react';

import './button.css';

interface ButtonProps {
    className?: string;
}

const Button: React.FunctionComponent<React.PropsWithChildren<ButtonProps>> =
(props: React.PropsWithChildren<ButtonProps>) => {
    const { children, className } = props;

    let buttonClassName = "default-button";
    if (className) {
        buttonClassName += ` ${className}`;
    }

    return (
        <button className={buttonClassName}>{children}</button>
    );
};

export default Button;