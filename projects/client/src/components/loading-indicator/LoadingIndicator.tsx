import * as React from 'react';

import './loading-indicator.css';

type LoadingIndicator = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const LoadingIndicator: React.FunctionComponent<LoadingIndicator> = (props: LoadingIndicator) => {
    let className = "loading-indicator";

    if (props.className) {
        className += ` ${props.className}`;
    }

    return (
        <div {...props} className={className}></div>
    );
}

export default LoadingIndicator;